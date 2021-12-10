import { NgModule } from '@angular/core';
import {ChatComponent} from './chat.component';
import {ChatService} from './chat.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [ChatService],
  exports: [
    ChatComponent
  ],
  bootstrap: []
})
export class ChatModule { }
