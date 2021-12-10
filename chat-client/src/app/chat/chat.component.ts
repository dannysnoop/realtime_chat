import { Component, OnInit } from '@angular/core';
import {ChatService} from './chat.service';
import {ChatDto} from '../DTO/chat.dto';
import * as moment from 'moment';
import {scrollBottom, validRangeChat} from '../common/help';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  person: 'me' | 'bot' = 'me';
  message = ''
  lstChat: ChatDto[];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.onNewMessage().subscribe((msg : ChatDto) => {
        this.lstChat.push(msg);
        this.lstChat = validRangeChat(this.lstChat);
    })

    this.chatService.InitChat().subscribe((init: ChatDto[]) => {
      this.lstChat = init;
      scrollBottom()
    })
  }
  sendMessage = () => {
    if (this.message){
      const messageChat : ChatDto = {message: this.message, user: this.person, time: moment(Date.now()).format('HH:mm:ss')};
      this.lstChat.push(messageChat)
      this.chatService.sendMessage(this.message, this.person);
      this.lstChat = validRangeChat(this.lstChat);
      this.message = '';
    }
  }

  selectUser = (person) => {
    this.person = person;
  }

}
