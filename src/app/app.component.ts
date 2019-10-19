import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from "./data.service"
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private title:string = 'realtor';
  public userid:string="";
  public message:string;
  public userpic:String="http://localhost:8000/userphotos/"+localStorage.getItem('userpic')
  
  public username:String = localStorage.getItem('username')

  constructor(private data:DataService,public _authService:AuthService){

  }

  ngOnInit()
  {
    this.data.currentMessage.subscribe(x=>this.userid=x)
  }
 
}
