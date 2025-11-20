param(
    [string]$ImageTag = "latest",
    [string]$AwsRegion = "us-east-2",
    [string]$AwsAccountId = "814436217782"
)

$ErrorActionPreference = "Stop"

$EcrRepo = "connectfour-migrations"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Building Migration Image" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Image Tag: $ImageTag"
Write-Host "Region: $AwsRegion"
Write-Host ""

# Build image
Write-Host "Building Docker image..." -ForegroundColor Yellow
Set-Location api
docker build -f Dockerfile.migrations -t "${EcrRepo}:${ImageTag}" .
if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker build failed"
    exit 1
}
Set-Location ..

# Login to ECR
Write-Host ""
Write-Host "Logging in to ECR..." -ForegroundColor Yellow
$loginCommand = aws ecr get-login-password --region $AwsRegion
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to get ECR login password"
    exit 1
}

$loginCommand | docker login --username AWS --password-stdin "${AwsAccountId}.dkr.ecr.${AwsRegion}.amazonaws.com"
if ($LASTEXITCODE -ne 0) {
    Write-Error "ECR login failed"
    exit 1
}

# Tag image
Write-Host ""
Write-Host "Tagging image..." -ForegroundColor Yellow
$fullImageName = "${AwsAccountId}.dkr.ecr.${AwsRegion}.amazonaws.com/${EcrRepo}:${ImageTag}"
docker tag "${EcrRepo}:${ImageTag}" $fullImageName

# Push to ECR
Write-Host ""
Write-Host "Pushing to ECR..." -ForegroundColor Yellow
docker push $fullImageName
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to push image to ECR"
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Migration image pushed successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host "Image: $fullImageName"