param(
    [string]$AwsRegion = "us-east-2",
    [string]$ClusterName = "mac-first-cluster",
    [string]$TaskDefinition = "connectfour-migrations",
    [string]$SubnetIds = "subnet-0fb89fee79f659612,subnet-011e3b05049a79809,subnet-0af5b0aad27acdc49",
    [string]$SecurityGroupIds = "sg-09b9a1ecdc6d26de5"
)


$ErrorActionPreference = "Stop"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Running Database Migrations" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Cluster: $ClusterName"
Write-Host "Task Definition: $TaskDefinition"
Write-Host "Region: $AwsRegion"
Write-Host "Subnets: $SubnetIds"
Write-Host "Security Groups: $SecurityGroupIds"
Write-Host ""

# Run the migration task
Write-Host "Starting migration task..." -ForegroundColor Yellow

# Build network configuration
$networkConfig = "awsvpcConfiguration={subnets=[$SubnetIds],securityGroups=[$SecurityGroupIds],assignPublicIp=ENABLED}"

$taskArn = aws ecs run-task `
    --cluster $ClusterName `
    --task-definition $TaskDefinition `
    --launch-type FARGATE `
    --platform-version LATEST `
    --network-configuration $networkConfig `
    --query 'tasks[0].taskArn' `
    --output text `
    --region $AwsRegion

if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrEmpty($taskArn)) {
    Write-Host "Failed to start migration task" -ForegroundColor Red
    Write-Host "Exit code: $LASTEXITCODE" -ForegroundColor Red
    exit 1
}

Write-Host "Migration task started: $taskArn" -ForegroundColor Green
Write-Host ""

# Extract task ID
$taskId = ($taskArn -split '/')[-1]
Write-Host "Task ID: $taskId"
Write-Host ""

# Wait for task to complete
Write-Host "Waiting for migration task to complete..." -ForegroundColor Yellow
Write-Host "(This may take 1-3 minutes...)" -ForegroundColor Gray

aws ecs wait tasks-stopped `
    --cluster $ClusterName `
    --tasks $taskArn `
    --region $AwsRegion

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error waiting for task to stop" -ForegroundColor Red
    exit 1
}

# Get task details
$taskDetailsJson = aws ecs describe-tasks `
    --cluster $ClusterName `
    --tasks $taskArn `
    --region $AwsRegion

$taskDetails = $taskDetailsJson | ConvertFrom-Json

# Extract exit code and stop reason
$exitCode = $taskDetails.tasks[0].containers[0].exitCode
$stopReason = $taskDetails.tasks[0].stoppedReason

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan

if ($exitCode -eq 0) {
    Write-Host "Migrations completed successfully!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    
    # Show logs
    Write-Host ""
    Write-Host "Recent migration logs:" -ForegroundColor Yellow
    aws logs tail /ecs/migrations `
        --log-stream-names "migration/$taskId" `
        --region $AwsRegion `
        --since 5m `
        --format short 2>$null
    
    exit 0
} else {
    Write-Host "Migrations failed with exit code: $exitCode" -ForegroundColor Red
    Write-Host "Stop reason: $stopReason" -ForegroundColor Red
    Write-Host "================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "To view full logs:" -ForegroundColor Yellow
    Write-Host "aws logs tail /ecs/migrations --log-stream-names migration/$taskId --region $AwsRegion" -ForegroundColor Cyan
    
    # Try to show recent logs
    Write-Host ""
    Write-Host "Recent logs:" -ForegroundColor Yellow
    aws logs tail /ecs/migrations `
        --log-stream-names "migration/$taskId" `
        --region $AwsRegion `
        --since 10m `
        --format short 2>$null
    
    exit 1
}