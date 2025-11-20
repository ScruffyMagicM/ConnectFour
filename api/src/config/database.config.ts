import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Game } from '../interfaces/game.class';
import path from 'path';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get('nodeEnv') === 'production';
  
    return {
      type: 'postgres',
      url: configService.get('database.url'),
      autoLoadEntities: true,
      entities: [Game],
      synchronize: !isProduction, // NEVER true in production
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      logging: !isProduction,
      // Migration files
      migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
      migrationsTableName: 'migrations',
      migrationsRun: false,
    };
};