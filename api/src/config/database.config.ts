import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Game } from 'src/interfaces/game.class';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get('nodeEnv') === 'production';
  
  // Option 1: Use full DATABASE_URL (recommended for AWS RDS)
    return {
      type: 'postgres',
      url: configService.get('database.url'),
      entities: [Game],
      synchronize: !isProduction, // NEVER true in production
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      logging: !isProduction,
    };
};