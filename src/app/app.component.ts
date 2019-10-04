import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DataService } from "./data.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private title:string = 'realtor';
  public signedin:boolean=false;
  public message:string;
  
  

  constructor(private data:DataService){

  }

  ngOnInit()
  {
    this.data.currentMessage.subscribe(signedin=>this.signedin=signedin)
  }
 
}
