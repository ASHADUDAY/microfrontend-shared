import { Component } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'navbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router : Router){
this.router.events.subscribe((event:Event)=>{
  if(event instanceof NavigationStart){
 if(event.url == "/login" || event.url == "/"){
  this.userLoggedIn = false;
 }
 else{
  this.userLoggedIn = true;
 }
  }
})
  }
  title = 'navbar';
  userLoggedIn : boolean = false;


}
