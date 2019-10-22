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
  agreements:boolean;

  loginerr:string=""
  returnUrl: string=null

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
        localStorage.setItem('userid',res.user._id)
        localStorage.setItem('username',res.user.username)
        localStorage.setItem('email',res.user.email)
        localStorage.setItem('userpic',res.user.userphoto)

        this.userid=res.user._id
        console.log(res.user._id)

        if(this.returnUrl==null)
        {
        this._router.navigate(['/buy'])
        }
        else
        {
          this._router.navigateByUrl(this.returnUrl);

        }      
      },
      err=>{
        console.log(err)
        this.loginerr=err.error
      }
    )
  }

  signup(){
    
    //console.log(this.registeredUserData)
    this._auth.registerUser(this.registeredUserData).subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token',res.token)
        this.data.changeMessage(res.registeredUser._id);
        localStorage.setItem('userid',res.registeredUser._id)
        localStorage.setItem('username',res.registeredUser.username)
        localStorage.setItem('email',res.registeredUser.email)

        this.userid=res.registeredUser._id
        console.log(res.registeredUser._id)
        if(this.returnUrl==null)
        {
        this._router.navigate(['/buy'])
        }
        else
        {
          this._router.navigateByUrl(this.returnUrl);

        }
      },
      err=>{console.log(err)
      console.log(err.error)
      }
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

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

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
