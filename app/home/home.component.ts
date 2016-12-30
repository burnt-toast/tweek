import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {Router}  from '@angular/router';



@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['app/home/home.component.css']
})
export class HomeComponent{
  userName: String = '';
  constructor(
    private _userService : UserService,
    private router: Router
  ){}

//On click of the button set the user name and navigate to the games page
  start() {
    console.log('User name is ' + this.userName);
    this._userService.setUserName(this.userName);
    this.router.navigate(['/game']);
  };
}
