import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { ActivatedRoute } from "@angular/router";


import * as $ from 'jquery';


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
  
  @Output() public childevent =new EventEmitter();

  signin(){
      this.childevent.emit(true)
  }

  signup(){
    this.childevent.emit(true)
  }
  constructor(private route: ActivatedRoute) {
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
