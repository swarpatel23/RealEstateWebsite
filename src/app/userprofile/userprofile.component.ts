import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  newpassword:string=""
  userdetail={userphoto:"",username:localStorage.getItem('username'),firstname:"",lastname:"",email:localStorage.getItem('email'),password:"",contactnumber:"",address:"",recoveryemail:""}
  constructor() { }

  updateUserDetail(){
    this.userdetail.userphoto="fixphoto"
    //this.userdetail.username=localStorage.getItem('username')
    //this.userdetail.email=localStorage.getItem('email')
    console.log(this.userdetail)
  }
  ngOnInit() {
    $(document).ready(function () {


      var readURL = function (input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e:ProgressEvent) {
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
      var str:string = <string>$(this).val();
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
