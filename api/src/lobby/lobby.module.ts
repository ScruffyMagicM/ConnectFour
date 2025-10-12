import { Module } from '@nestjs/common';
import { LobbyController } from './lobby.controller';
import { LobbyService } from './lobby.service';
import { LobbyGateway } from './lobby.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../interfaces/game.class';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [LobbyController],
  providers: [LobbyService, LobbyGateway],
})
export class LobbyModule {}