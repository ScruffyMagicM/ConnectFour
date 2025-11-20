param(
    [string]$AwsRegion = "us-east-2",
    [string]$ClusterName = "mac-first-cluster",
    [string]$TaskDefinition = "connectfour-migrations",
    [string]$SubnetIds = "subnet-0fb89fee79f659612,subnet-011e3b05049a79809,subnet-0af5b0aad27acdc49",
    [string]$SecurityGroupIds = "sg-09b9a1ecdc6d26de5"
)

$ErrorActionPreference = "Stop"

Write-Host "WARNING: Rolling back last migration" -ForegroundColor Yellow
Write-Host "This will run migration:revert" -ForegroundColor Yellow
$confirm = Read-Host "Continue? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "Aborted" -ForegroundColor Yellow
    exit 0
}

# Get current task definition
$taskDefJson = aws ecs describe-task-definition `
    --task-definition $TaskDefinition `
    --query 'taskDefinition' | ConvertFrom-Json

# Remove fields not needed for registration
$taskDefJson.PSObject.Properties.Remove('taskDefinitionArn')
$taskDefJson.PSObject.Properties.Remove('revision')
$taskDefJson.PSObject.Properties.Remove('status')
$taskDefJson.PSObject.Properties.Remove('requiresAttributes')
$taskDefJson.PSObject.Properties.Remove('compatibilities')
$taskDefJson.PSObject.Properties.Remove('registeredAt')
$taskDefJson.PSObject.Properties.Remove('registeredBy')

# Update command to run revert
$taskDefJson.containerDefinitions[0].command = @("npm", "run", "migration:revert")
$taskDefJson.family = $taskDefJson.family + "-rollback"

# Convert to JSON and save temporarily
$tempFile = [System.IO.Path]::GetTempFileName()
$taskDefJson | ConvertTo-Json -Depth 10 | Set-Content $tempFile

# Register rollback task definition
$rollbackTask = aws ecs register-task-definition `
    --cli-input-json "file://$tempFile" `
    --query 'taskDefinition.taskDefinitionArn' `
    --output text

Remove-Item $tempFile

Write-Host "Running rollback task: $rollbackTask"

# Run rollback
$networkConfig = @"
awsvpcConfiguration={
    subnets=[$SubnetIds],
    securityGroups=[$SecurityGroupIds],
    assignPublicIp=DISABLED
}
"@

$taskArn = aws ecs run-task `
    --cluster $ClusterName `
    --task-definition $rollbackTask `
    --launch-type FARGATE `
    --network-configuration $networkConfig `
    --query 'tasks[0].taskArn' `
    --output text

Write-Host "Rollback task: $taskArn"

# Wait for completion
aws ecs wait tasks-stopped --cluster $ClusterName --tasks $taskArn

# Check result
$taskDetails = aws ecs describe-tasks `
    --cluster $ClusterName `
    --tasks $taskArn | ConvertFrom-Json

$exitCode = $taskDetails.tasks[0].containers[0].exitCode

if ($exitCode -eq 0) {
    Write-Host "Migration rolled back successfully" -ForegroundColor Green
} else {
    Write-Host "Rollback failed with exit code: $exitCode" -ForegroundColor Red
    exit 1
}