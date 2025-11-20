# deploy/run-migrations.sh

set -e

# Configuration
AWS_REGION="${AWS_REGION:-us-east-2}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-814436217782}"
CLUSTER_NAME="${CLUSTER_NAME:-mac-first-cluster}"
TASK_DEFINITION="${TASK_DEFINITION:-connectfour-migrations}"
SUBNET_IDS="${SUBNET_IDS:-subnet-0fb89fee79f659612,subnet-011e3b05049a79809,subnet-0af5b0aad27acdc49}"
SECURITY_GROUP_IDS="${SECURITY_GROUP_IDS:-sg-09b9a1ecdc6d26de5}"

echo "================================================"
echo "🗃️  Running Database Migrations"
echo "================================================"
echo "Cluster: $CLUSTER_NAME"
echo "Task Definition: $TASK_DEFINITION"
echo "Region: $AWS_REGION"
echo ""

# Run the migration task
echo "📤 Starting migration task..."
TASK_ARN=$(aws ecs run-task \
  --cluster "$CLUSTER_NAME" \
  --task-definition "$TASK_DEFINITION" \
  --launch-type FARGATE \
  --platform-version LATEST \
  --network-configuration "awsvpcConfiguration={
    subnets=[$SUBNET_IDS],
    securityGroups=[$SECURITY_GROUP_IDS],
    assignPublicIp=DISABLED
  }" \
  --query 'tasks[0].taskArn' \
  --output text \
  --region "$AWS_REGION")

if [ -z "$TASK_ARN" ]; then
  echo "❌ Failed to start migration task"
  exit 1
fi

echo "✅ Migration task started: $TASK_ARN"
echo ""

# Get task ID from ARN
TASK_ID=$(echo "$TASK_ARN" | awk -F/ '{print $NF}')

# Stream logs (if CloudWatch logs are configured)
echo "📋 Streaming migration logs..."
LOG_GROUP="/ecs/migrations"
LOG_STREAM="migration/$TASK_ID"

# Wait a moment for log stream to be created
sleep 10

# Tail logs in background
aws logs tail "$LOG_GROUP" \
  --follow \
  --log-stream-names "$LOG_STREAM" \
  --region "$AWS_REGION" \
  --format short \
  2>/dev/null &

LOG_PID=$!

# Wait for task to complete
echo ""
echo "⏳ Waiting for migration task to complete..."
aws ecs wait tasks-stopped \
  --cluster "$CLUSTER_NAME" \
  --tasks "$TASK_ARN" \
  --region "$AWS_REGION"

# Stop log tailing
kill $LOG_PID 2>/dev/null || true

# Get task details
TASK_DETAILS=$(aws ecs describe-tasks \
  --cluster "$CLUSTER_NAME" \
  --tasks "$TASK_ARN" \
  --region "$AWS_REGION")

# Extract exit code
EXIT_CODE=$(echo "$TASK_DETAILS" | \
  jq -r '.tasks[0].containers[0].exitCode // 1')

# Extract stop reason
STOP_REASON=$(echo "$TASK_DETAILS" | \
  jq -r '.tasks[0].stoppedReason // "Unknown"')

echo ""
echo "================================================"

if [ "$EXIT_CODE" = "0" ]; then
  echo "✅ Migrations completed successfully!"
  echo "================================================"
  exit 0
else
  echo "❌ Migrations failed with exit code: $EXIT_CODE"
  echo "Stop reason: $STOP_REASON"
  echo "================================================"
  echo ""
  echo "To view full logs:"
  echo "aws logs tail $LOG_GROUP --log-stream-names $LOG_STREAM --region $AWS_REGION"
  exit 1
fi