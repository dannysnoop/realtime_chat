import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';
import { redisConfig } from '../common/redis-config';
import { RedisBase } from '../redis/redis-base';
import * as moment from 'moment';

@WebSocketGateway(4001, { cors: true })
export class ChatWsGatewayService implements  OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private redis: RedisBase) {
  }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('sendMessage')
  async handleEvent(client: Socket, data) {
    await this.redis.rPushRedis('chat', { ...data, time:  moment(Date.now()).format('HH:mm:ss')})
    client.broadcast.emit('newMessage' , {... data, time: moment(Date.now()).format('HH:mm:ss')})
    return data;
  }

  afterInit(server: any): any {
    console.log("ws init")
  }

  async handleConnection(client: any, ...args: any[]) {
    let initChat = await this.redis.getLRangeRedis('chat', -15, -1);
    initChat = initChat.map(z=> JSON.parse(z));
    client.emit("init",initChat)
  }

  handleDisconnect(client: any): any {
  }
}
