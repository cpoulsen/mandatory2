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
      private service: ChatroomService
      /*private logger: Logger*/) {
  }

  getChatrooms() {
    console.log("Subscribe to service");
    this.service.getChatroomsFromServer()
        .subscribe(
            listOfChatrooms => {
              //console.log("Messages:",messages);
              this.chatrooms = listOfChatrooms;
              console.log(this.chatrooms);
              console.log(this.chatrooms);
            },
            error =>  this.chatrooms = <any>error
        );
    return this.chatrooms;
  }

  addChatroom() {
    this.service.addChatroom(this.model)
        .subscribe(
            user => {
              this.model = user;
              this.getChatrooms();
            },
            error =>  this.title = <any>error
        );
  }

  /*  checkLogin(username, password) {
   console.log("Subscribe to service");
   this.service.getUsersFromServer()
   .subscribe(
   listOfUsers => {
   //console.log("Messages:",messages);
   this.users = listOfUsers;
   },
   error =>  this.users = <any>error
   );
   return;
   }*/

  ngOnInit() {
    this.getChatrooms();
  }

}
