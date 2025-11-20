import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

// Load environment variables
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Stuyvesant1',
  database: process.env.DB_NAME || 'ConnectFour',
  ssl: false,
  
  // Entity files
  entities: [path.join(__dirname, '../interfaces/*{.ts,.js}')],
  
  // Migration files
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  
  // IMPORTANT: Don't auto-sync
  synchronize: false,
  
  // Log migrations
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log'],
});