export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-2',
    s3Bucket: process.env.AWS_S3_BUCKET,
  },
  api: {
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  }
});