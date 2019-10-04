import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { ActivatedRoute } from "@angular/router";


import * as $ from 'jquery';
import { DataService } from '../data.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  public username:string;
  public password:string;
  public contactno:number;
  public address:string;
  public email:string;
  public signedin:boolean;
  

  signin(){
    console.log("hi");
    this.data.changeMessage(true);
  }

  signup(){
    this.signedin=true;
    this.data.changeMessage(true);

  }

  
  constructor(private route: ActivatedRoute,private data: DataService) {
    this.route.url.subscribe(url => {
      //console.log(url);
      this.chk();
    });
  }

  chk() {
    let disp = this.route.snapshot.paramMap.get("disp")
    if (disp == "signup") {
      $('.signin').hide();
      $('.signup').show();
    }
    else {
      $('.signup').hide();
      $('.signin').show();
    }

  }

  ngOnInit() {
    this.data.currentMessage.subscribe(signedin=>this.signedin=signedin)
    let target;
    // let searchParams = new URLSearchParams(window.location.search);
    // if(searchParams.has('disp'))
    // {
    //     let param = searchParams.get('disp')
    //     if(param=="signin")
    //     {

    //         $('.signup').hide();
    //         $('.signin').show();
    //     }
    //     if(param=="signup")
    //     {
    //         $('.signin').hide();
    //         $('.signup').show();
    //     }
    // }


    $('.link a').on('click', function (e) {
      e.preventDefault();
      target = $(this).attr('href');

      //$(target).show(1000);
      console.log(target);
      if (target == "#signin") {
        $('.signup').hide(100);
        $('.signin').fadeIn(700);
        document.title = "signin";
      }
      else {
        $('.signin').hide();
        $('.signup').fadeIn(700);
        document.title = "signup";
      }
    });
  }

}
