import { Component, OnInit } from '@angular/core';
import {User} from './user.model';
import {UserService} from './../user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:  [ UserService ]
})
export class LoginComponent implements OnInit {

  private users: User[] = [];
  public userList = this.users;

  constructor(
      private service: UserService
      /*private logger: Logger*/) {
  }

  getUsers() {
    console.log("Subscribe to service");
    this.service.getUsersFromServer()
        .subscribe(
            listOfUsers => {
              //console.log("Messages:",messages);
              this.users = listOfUsers;
              console.log(this.users);
            },
            error =>  this.users = <any>error
        );
    return this.users;
  }

  checkLogin(username, password) {
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
  }

  ngOnInit() {
    this.getUsers();
  }
}
