import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatWsGatewayService } from './chat-ws-gateway/chat-ws-gateway.service';
import { RedisBase } from './redis/redis-base';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatWsGatewayService,RedisBase],
})
export class AppModule {}
