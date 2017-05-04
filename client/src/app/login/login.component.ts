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
  title = 'MEAN app with Angular2';
  model = new User('');

  constructor(
      private service: UserService) {
  }

  getUsers() {
    this.service.getUsersFromServer()
        .subscribe(
            listOfUsers => {
              this.users = listOfUsers;
            },
            error =>  this.users = <any>error
        );
    return this.users;
  }

    addUser() {
        this.resetModel(this.model, this.model.username);
        this.service.addUser(this.model)
            .subscribe(
                user => {
                    this.model = user;
                    this.getUsers();
                },
                error =>  this.title = <any>error
            );
    }

    resetModel(userModel, userModelUsername) {
        userModel = new User(userModelUsername);
        this.model = userModel;
    }

  ngOnInit() {
    this.getUsers();
  }
}
