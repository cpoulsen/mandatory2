import { Component, OnInit } from '@angular/core';
import {Chatroom} from './chatroom.model';
import {ChatroomService} from './../chatroom.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
      providers:  [ ChatroomService ]
})
export class ChatroomComponent implements OnInit {

  private chatrooms: Chatroom[] = [];
  title = 'MEAN app with Angular2';
  model = new Chatroom("");

  constructor(
      private service: ChatroomService,
      /*private logger: Logger*/) {
  }

  getChatrooms() {
    console.log("Subscribe to service");
    this.service.getChatroomsFromServer()
        .subscribe(
            listOfChatrooms => {
              this.chatrooms = listOfChatrooms;
            },
            error =>  this.chatrooms = <any>error
        );
    return this.chatrooms;
  }

  addChatroom() {
    console.log("-----------------------BEFORE RESET -------------------------------------- ");
    console.log(this.model);
    this.resetModel(this.model, this.model.roomName);
    console.log("-----------------------AFTER RESET -------------------------------------- ");
    console.log(this.model);
    this.service.addChatroom(this.model)
        .subscribe(
            chatroom => {
              this.model = chatroom;
              this.getChatrooms();
            },
            error => this.title = <any>error
        );
  }

  //This method is needed to prevent the _id from MongoDb to be attached to the model object.
  resetModel(chatroomModel, chatroomModelRoomName) {
    chatroomModel= new Chatroom(chatroomModelRoomName)
    this.model = chatroomModel
  }

  ngOnInit() {
    this.getChatrooms();
    
  }

}
