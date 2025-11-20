param(
    [Parameter(Mandatory=$true)]
    [string]$VpcId,
    
    [Parameter(Mandatory=$true)]
    [string]$SubnetIds,
    
    [Parameter(Mandatory=$true)]
    [string]$SecurityGroupId,
    
    [string]$AwsRegion = "us-east-2"
)

$ErrorActionPreference = "Stop"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Creating VPC Endpoints" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "VPC: $VpcId"
Write-Host "Subnets: $SubnetIds"
Write-Host "Security Group: $SecurityGroupId"
Write-Host "Region: $AwsRegion"
Write-Host ""

$subnetArray = $SubnetIds -split ","

Write-Host "Finding route tables..." -ForegroundColor Yellow

$routeTables = aws ec2 describe-route-tables `
    --filters "Name=vpc-id,Values=$VpcId" `
              "Name=association.subnet-id,Values=$($subnetArray -join ',')" `
    --query "RouteTables[*].RouteTableId" `
    --output text `
    --region $AwsRegion

$routeTableArray = $routeTables -split "\s+"

Write-Host "Route Tables: $($routeTableArray -join ', ')"
Write-Host ""

function MakeEndpoint {
    param(
        [string]$ServiceName,
        [string]$DisplayName
    )

    Write-Host "Creating $DisplayName endpoint..." -ForegroundColor Yellow

    try {
        $endpoint = aws ec2 create-vpc-endpoint `
            --vpc-id $VpcId `
            --vpc-endpoint-type Interface `
            --service-name "com.amazonaws.$AwsRegion.$ServiceName" `
            --subnet-ids $subnetArray `
            --security-group-ids $SecurityGroupId `
            --private-dns-enabled `
            --query "VpcEndpoint.VpcEndpointId" `
            --output text `
            --region $AwsRegion
        
        Write-Host "$DisplayName endpoint created: $endpoint" -ForegroundColor Green
    }
    catch {
        Write-Host "$DisplayName endpoint may already exist or error occurred" -ForegroundColor Yellow
    }
}

MakeEndpoint "secretsmanager" "Secrets Manager"
MakeEndpoint "ecr.api" "ECR API"
MakeEndpoint "ecr.dkr" "ECR Docker"
MakeEndpoint "logs" "CloudWatch Logs"

Write-Host ""
Write-Host "Creating S3 Gateway endpoint..." -ForegroundColor Yellow
try {
    $s3Endpoint = aws ec2 create-vpc-endpoint `
        --vpc-id $VpcId `
        --vpc-endpoint-type Gateway `
        --service-name "com.amazonaws.$AwsRegion.s3" `
        --route-table-ids $routeTableArray `
        --query "VpcEndpoint.VpcEndpointId" `
        --output text `
        --region $AwsRegion

    Write-Host "S3 Gateway endpoint created: $s3Endpoint" -ForegroundColor Green
}
catch {
    Write-Host "S3 endpoint may already exist" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "VPC Endpoints Created Successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""