import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { GameModule } from './game/game.module';
import { LobbyModule } from './lobby/lobby.module';
import { WebSocketModule } from './websocket/broadcast.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
    }),
    GameModule,
    LobbyModule,
    WebSocketModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
