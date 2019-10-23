import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import * as $ from 'jquery';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {AppointmentService} from '../appointment.service';
import {StatusService} from '../status.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserprofileComponent implements OnInit {
  tempdate:any;
  appointments:any = [];
  hadress:any = [];
  previousdetail = ""
  newpassword: string = ""
  public userdetail = { userphoto: "", username: localStorage.getItem('username'), firstname: "", lastname: "", email: localStorage.getItem('email'), password: "", contactnumber: "", address: "", recoveryemail: "", newpassword: "" }
  constructor(
    private _snackBar:MatSnackBar,
    private statusService:StatusService,
    private _house: HouseService, 
    private _router: Router,
    private _auth: AuthService, 
    private appointmentService:AppointmentService    
    ) {

    this.appointmentService.getAppointment(localStorage.getItem('userid')).subscribe(res=>{
      console.log('res from appointment service :', res);     
      this.appointments = res["appointments"];
      this.appointments = this.appointments.filter(x=>x.status==false);
      this.hadress = res["houses"];
    })
    this.statusService.checkStatus(localStorage.getItem("userid")).subscribe(res=>{
      console.log('res from statusService service checkStatus:', res);     
      this.notification = res;  
      this.notification.reverse();  
      
    })
    this.statusService.checkMeetings(localStorage.getItem("userid")).subscribe(res=>{
      console.log('res from checkMeetings service checkStatus:', res);     
      this.meetings = res;
      this.meetings.reverse();
      
    })
    
   }
   open_snackbar(message:string)
   {     
      this._snackBar.open(message,"Close",{duration:3000});
   }
   appointmentslistslength()
   {
    //return this.appointments.filter(x=>x.status==false).length;
    return this.appointments.length;
   }
   appointmentslists()
   {
     console.log('this.appointments :', this.appointments);     
     //return this.appointments.filter(x=>x.status==false);
     return this.appointments;
   }
  houses = []
  userpic:String=""
  updateusererror: String = null
  updateteduser: boolean = false
  uploadedFiles: Array<File>=null;
  fileChange(element) {
    this.uploadedFiles = element.target.files;
    console.log(this.uploadedFiles)
  }
  

  uploaduser() {

  }
  updateUserDetail() {
    if (this.uploadedFiles!=null) {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);

    }
    
      this._auth.uploadUserPhoto(formData).subscribe(
        res => {
          this.userdetail.userphoto = res.message;
          console.log(this.userdetail);
          console.log(res.message);
          console.log(res);
          localStorage.setItem('userpic',res.message);
        },
        err => {
          console.log(err.error)
        })
    }

    // console.log(formData);
    //console.log(this.uploadedFiles[0]);
    //this.userdetail.userphoto=this.uploadedFiles[0].name;

    this.updateteduser = false;
    this.updateusererror = null
    //this.userdetail.userphoto="fixphoto"
    //this.userdetail.username=localStorage.getItem('username')
    //this.userdetail.email=localStorage.getItem('email')
    setTimeout(function () {
      console.log(this.userdetail);
      this._auth.updateUserDetail(this.userdetail).subscribe(
        res => {
          console.log(res);
          this.updateteduser = true;
          this.open_snackbar("Updated User profile succesfully!!");
          if(res.user.userphoto!=""){
            this.userpic="http://localhost:8000/userphotos/"+res.user.userphoto;
            //this.userpic=this.userpic.replace("uploads\\","");
            
          }
          else
          {
            this.userpic="../assets/image/userphoto.jpg"
          }

        },
        err => {
          console.log(err.error)
          this.updateusererror = err;
        }
      )
      console.log(this.userdetail)
    }.bind(this), 700)
  }

  findhouses() {
    this._house.getHouseDetailOfUser().subscribe(
      res => {
        console.log(res);
        this.houses = res.houses;
      },
      err => {
        console.log(err);
      }
    )
  }
  gethouseslength()
  {
    return this.houses.length;
  }
  gethousesList()
  {
    this.houses;
  }
  displayhouse(house)
  {
    sessionStorage.setItem('clickedhouse',JSON.stringify(house))
    this._router.navigate(['/housedetail'])
    console.log(house);
  }
  appointmentuserimg=""
  appointmentimg=""
  appointuser=""
  getProfile(uid)
  {        
    //console.log(this.appointmentService.getProfile(uid));
   this._auth.getUserById(uid).subscribe(res => {
        //console.log(res);
        this.appointuser=res
        this.appointmentuserimg=res.userinfo.userphoto
        //console.log(this.appointmentuserimg)
        //console.log(res.userphoto)
        this.appointmentimg="http://localhost:8000/userphotos/"+this.appointmentuserimg
        //this.appointmentimg = this.appointmentimg.replace("uploads\\","");
        //console.log(this.appointmentimg)
        return this.appointmentimg;
        
      },
      err => {
        console.log(err);
      });
    return this.appointmentimg;
  }
  nameobj = {};
  getName(uid)
  {        
    //console.log(this.appointmentService.getProfile(uid));
    let name;
   this._auth.getUserByIdForName(uid).subscribe(res => {        
        //console.log(res.firstname+ res.lastname);
    //   console.log('res for name :', res);
     //  console.log('res.userinfo.username :', res.userinfo.username);
       name = res.userinfo.username               
        //this.nameobj.push({name:name,id:res.userinfo._id});              
        this.nameobj[uid.toString()] = name;
       //return res.userinfo.username;
        
      },
      err => {
        console.log(err);
      });      
    //  console.log('this.nameobj :', this.nameobj);
      
  }
  getAddress(hid)
  {
    for (let index = 0; index < this.hadress.length; index++) {
      const element = this.hadress[index];
      if(element["hid"]==hid)
      {
        return element["address"];

      }
      
    }
  }
  date;
  accept(appointment,user)
  {
    // this.getProfile(user);
    // console.log(this.appointuser)
    // console.log(appointment.id)
    // this.statusService.sendmail({appid:appointment.id},this.appointuser).subscribe(
    //   res=>{},
    //   err=>{}
    // );
    console.log("accept: ",appointment);    
    console.log(this.appointments);    
    this.statusService.setStatus(appointment.id,this.date)
    .subscribe(
      res=>{
        this.appointments = this.appointments.filter(x=>x._id != appointment.id); 
        console.log('res :', res);
        this.open_snackbar("Accepted Request ");
      },
      err=>{
        console.log('err :', err);
      }
    );
  }
  reject(appointment)
  {
    
    console.log("reject: ",appointment);
    this.statusService.rejectStatus(appointment.id,this.date)
    .subscribe(
      res=>{
        this.appointments = this.appointments.filter(x=>x._id != appointment.id); 
        console.log('res :', res);
        this.open_snackbar("Reject Request ");
      },
      err=>{
        console.log('err :', err);
      }
    );
  }
  meetings:any=[];
  getMeetings()
  {
    return this.meetings;
  }
  notification:any=[];
  getNotifications()
  { 
    //console.log('this.notification :', this.notification);
    return this.notification;
  } 
  pchange()
  {
    $("#opass").show(1000);
      $("#npass").show(1000);
  }
  ngOnInit() {    
    this.findhouses();
    this.statusService.checkStatus(localStorage.getItem("userid")).subscribe(res=>{
    //  console.log('res from statusService service :', res);     
      this.notification = res; 
      this.notification.reverse();
      
    })
    this.appointmentService.getAppointment(localStorage.getItem('userid')).subscribe(res=>{
      console.log('res from appointment service :', res);     
      this.appointments = res["appointments"];      
      this.appointments = this.appointments.filter(x=>x.status==false)
      this.hadress = res["houses"];
    })
    this._auth.getUserDetail().subscribe(
      res => {
        console.log(res);
        this.userdetail.firstname = res.userinfo.firstname;
        this.userdetail.lastname = res.userinfo.lastname;
        this.userdetail.address = res.userinfo.address;
        this.userdetail.contactnumber = res.userinfo.contactnumber;
        this.userdetail.recoveryemail = res.userinfo.recoveryemail;
        this.userdetail.userphoto = res.userinfo.userphoto;
        if(res.userinfo.userphoto!=""){
            this.userpic="http://localhost:8000/userphotos/"+res.userinfo.userphoto;            
            //this.userpic=this.userpic.replace("uploads\\","");
          }
          else
          {
            this.userpic="assets/image/userphoto.jpg"
          }

        //this.userpic="./../../assets/image/uploads/userphotos/"+res.userinfo.userphoto;
        console.log("userpic: "+this.userpic);
      },
      err => {
        
        console.log(err.error)
      }
    )
    $(document).ready(function () {


      var readURL = function (input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e: ProgressEvent) {
            $('.avatar').attr('src', e.target["result"]);
          }

          reader.readAsDataURL(input.files[0]);
        }
      }


      $(".file-upload").on('change', function () {
        readURL(this);
      });

      $("input:radio").change(function () { $("#b1").prop("disabled", false); });

      $("#b1").click(function () {
        $(this).hide();
        $('#b2').hide();
        //console.log("b1");
        $('#accepted').show();
      });

      $("#b2").click(function () {
        $(this).hide();
        $('#b1').hide();
        $('#rejected').show();
      });
    });


    $("#contactno").change(function () {
      ///^\d{10}$/.test(str)
      var str: string = <string>$(this).val();
      if (str.match(/^\d{10}$/)) {
        console.log("1");
        $(this).css("border-color", "");
      }
      else {
        console.log("2");

        $(this).css("border-color", "red");
      }
    });

    $("#pchange").click(function () {
      $("#opass").show(1000);
      $("#npass").show(1000);
    });
  }


}
