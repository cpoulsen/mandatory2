import { Component, OnInit } from '@angular/core';
import {Chat} from './chat.model';
import {ChatService} from './../chat.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Chatroom} from "../chatroom/chatroom.model";
import {ChatroomService} from "../chatroom.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:  [ ChatService ]
})
export class ChatComponent implements OnInit {

  private chatMessages: Chat[] = [];
  title = 'MEAN app with Angular2';
  model = new Chat("", "", "");

  constructor(
      private service: ChatService
      /*private logger: Logger*/) {
  }

  getChatMessages() {
    console.log("Subscribe to service");
    this.service.getChatMessagesFromServer()
        .subscribe(
            listOfChatMessages => {
              //console.log("Messages:",messages);
              this.chatMessages = listOfChatMessages;
              console.log(this.chatMessages);
              console.log(this.chatMessages);
            },
            error =>  this.chatMessages = <any>error
        );
    return this.chatMessages;
  }

  addChatMessage() {
    this.service.addChatMessage(this.model)
        .subscribe(
            user => {
              this.model = user;
              this.getChatMessages();
            },
            error =>  this.title = <any>error
        );
  }

  ngOnInit() {
    this.getChatMessages();
  }

}
