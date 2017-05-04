import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Chat} from './chat.model';
import {ChatService} from './../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:  [ ChatService ]
})
export class ChatComponent implements OnInit {

  private chatMessages: Chat[] = [];
  title = 'MEAN app with Angular2';
  model = new Chat('', '', '');
  selectedChatRoom: string;

  constructor(
      private service: ChatService,
      private route: ActivatedRoute,
      private router: Router) {
  }

  getChatMessages(selectedChatRoom) {
    this.service.getChatMessagesFromServer(selectedChatRoom)
        .subscribe(
            listOfChatMessages => {
              this.chatMessages = listOfChatMessages;
            },
            error =>  this.chatMessages = <any>error
        );
    return this.chatMessages;
  }

    getInitialMessages(selectedChatRoom) {
        this.service.getInitialMessages(selectedChatRoom)
            .subscribe(
                listOfChatMessages => {
                    this.chatMessages = listOfChatMessages;
                },
                error =>  this.chatMessages = <any>error
            );
        return this.chatMessages;
    }


  addChatMessage() {
    this.resetModel(this.model, this.model.message, this.model.author, this.selectedChatRoom);
    this.service.addChatMessage(this.model)
        .subscribe(
            user => {
              this.model = user;
            },
            error =>  this.title = <any>error
        );
  }

  resetModel(chatModel, chatModelMessage, chatModelAuthor, chatModelRoomname) {
    chatModel= new Chat(chatModelMessage, chatModelAuthor, chatModelRoomname)
    this.model = chatModel
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedChatRoom = params['selectChatroom'];
    });
    this.getChatMessages(this.selectedChatRoom);
    this.getInitialMessages(this.selectedChatRoom);
  }
}
