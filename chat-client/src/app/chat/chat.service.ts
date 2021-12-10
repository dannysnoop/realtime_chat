import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:4001');
    this.socket.on('init' , data => console.log(data))
    this.onNewMessage();
    this.InitChat();
  }

  sendMessage = (msg: string, user: string) => {
    this.socket.emit('sendMessage', { message: msg, user });
  };

  onNewMessage = () : Observable<any> => {
    return new Observable<any>(obs => {
      this.socket.on('newMessage', msg => {
        obs.next(msg)
      });
    })


  }
  InitChat = () : Observable<any> => {
    return new Observable<any>(obs => {
      this.socket.on('init', init => {
        obs.next(init)
      })
    })
  }
}
