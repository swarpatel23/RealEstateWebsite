import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth.service"



import * as $ from 'jquery';
import { DataService } from '../data.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  registeredUserData={username:"",password:"",email:"",contactnumber:"",address:""}
  loginUserData={email:"",password:""}

  constructor(private route: ActivatedRoute,private data: DataService,private _auth:AuthService,
    private _router:Router) {
    this.route.url.subscribe(url => {
      //console.log(url);
      this.chk();
    });
  }
  public userid:string=""
  signin(){
    //console.log("hi");
    this._auth.loginUser(this.loginUserData).subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token',res.token)
        this.data.changeMessage(res.user._id);
        this.userid=res.user._id
        console.log(res.user._id)

        this._router.navigate(['/buy'])
      },
      err=>console.log(err)
    )
  }

  signup(){
    
    //console.log(this.registeredUserData)
    this._auth.registerUser(this.registeredUserData).subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token',res.token)
        this.data.changeMessage(res.user._id);
        this.userid=res.user._id
        console.log(res.user._id)
        this._router.navigate(['/buy'])

      },
      err=>console.log(err)
    )
    
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

  

    let disp = this.route.snapshot.paramMap.get("disp")
    if (disp == "signup") {
      $('.signin').hide();
      $('.signup').show();
    }
    else {
      $('.signup').hide();
      $('.signin').show();
    }
    this.data.currentMessage.subscribe(x=>this.userid=x)
    
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
