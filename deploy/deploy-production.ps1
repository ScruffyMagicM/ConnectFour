
param(
    [string]$ImageTag = "latest",
    [string]$AwsRegion = "us-east-2",
    [string]$AwsAccountId = "814436217782",
    [string]$ClusterName = "mac-first-cluster",
    [string]$ServiceName = "connectfour-backend",
    [string]$SubnetIds = "subnet-0fb89fee79f659612,subnet-011e3b05049a79809,subnet-0af5b0aad27acdc49",
    [string]$SecurityGroupIds = "sg-09b9a1ecdc6d26de5"
)

$ErrorActionPreference = "Stop"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Production Deployment" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Image Tag: $ImageTag"
Write-Host "Region: $AwsRegion"
Write-Host ""

# Step 1: Build and push migration image
Write-Host "Step 1/5: Building migration image..." -ForegroundColor Cyan
.\deploy\Build-And-Push-Migrations.ps1 -ImageTag $ImageTag -AwsRegion $AwsRegion -AwsAccountId $AwsAccountId

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build migration image"
    exit 1
}

# Step 2: Build and push application image
Write-Host ""
Write-Host "Step 2/5: Building application image..." -ForegroundColor Cyan
.\deploy\Build-And-Push-App.ps1 -ImageTag $ImageTag -AwsRegion $AwsRegion -AwsAccountId $AwsAccountId

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build application image"
    exit 1
}

# Step 3: Run migrations
Write-Host ""
Write-Host "Step 3/5: Running database migrations..." -ForegroundColor Cyan
.\deploy\Run-Migrations.ps1 `
    -AwsRegion $AwsRegion `
    -ClusterName $ClusterName `
    -SubnetIds $SubnetIds `
    -SecurityGroupIds $SecurityGroupIds

if ($LASTEXITCODE -ne 0) {
    Write-Error "Migrations failed! Aborting deployment."
    exit 1
}

# Step 4: Update ECS service
Write-Host ""
Write-Host "Step 4/5: Updating ECS service..." -ForegroundColor Cyan
aws ecs update-service `
    --cluster $ClusterName `
    --service $ServiceName `
    --force-new-deployment `
    --region $AwsRegion | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to update ECS service"
    exit 1
}

Write-Host "Service update initiated" -ForegroundColor Green

# Step 5: Wait for service to stabilize
Write-Host ""
Write-Host "Step 5/5: Waiting for service to stabilize..." -ForegroundColor Cyan
aws ecs wait services-stable `
    --cluster $ClusterName `
    --services $ServiceName `
    --region $AwsRegion

if ($LASTEXITCODE -ne 0) {
    Write-Error "Service failed to stabilize"
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Production deployment complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green