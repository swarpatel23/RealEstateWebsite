import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  previousdetail = ""
  newpassword: string = ""
  public userdetail = { userphoto: "", username: localStorage.getItem('username'), firstname: "", lastname: "", email: localStorage.getItem('email'), password: "", contactnumber: "", address: "", recoveryemail: "", newpassword: "" }
  constructor(private _house: HouseService, private _router: Router, private _auth: AuthService) { }

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
          if(res.user.userphoto!=""){
            this.userpic="http://localhost:8000/userphotos/"+res.user.userphoto;
          }
          else
          {
            this.userpic="assets/image/userphoto.jpg"
          }

        },
        err => {
          console.log(err.error)
          this.updateusererror = err;
        }
      )
      console.log(this.userdetail)
    }.bind(this), 1000)
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
  ngOnInit() {
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
