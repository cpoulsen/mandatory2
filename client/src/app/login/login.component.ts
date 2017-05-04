import { Component, OnInit } from '@angular/core';
import {User} from './user.model';
import {UserService} from './../user.service';
import { Router } from '@angular/router';

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
  feedback;

  constructor(
      private service: UserService,
      private router: Router) {
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


  loginUser(username) {
      this.resetModel(this.model, this.model.username);
      this.service.loginUser(username)
          .subscribe(
              feedback => {
                  if (feedback.length === 1) {
                      this.feedback = 'Username already in use';
                  } else {
                          this.resetModel(this.model, this.model.username);
                          this.service.addUser(this.model)
                              .subscribe(
                                  user => {
                                      this.model = user;
                                      this.getUsers();
                                  },
                                  error =>  this.title = <any>error
                              );
                          this.router.navigate(['./chatroom']);
                  }
              }
          );
  }
    /*addUser() {
        this.resetModel(this.model, this.model.username);
        this.service.addUser(this.model)
            .subscribe(
                user => {
                    this.model = user;
                    this.getUsers();
                },
                error =>  this.title = <any>error
            );
        this.router.navigate(['./chatroom']);
    }*/

    resetModel(userModel, userModelUsername) {
        userModel = new User(userModelUsername);
        this.model = userModel;
    }

  ngOnInit() {
    this.getUsers();
  }
}
