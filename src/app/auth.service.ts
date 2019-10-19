import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl="http://localhost:8000/api/register"
  private _loginUrl="http://localhost:8000/api/login";
  private _updateuserUrl="http://localhost:8000/api/updateuser";
  private _getuserUrl="http://localhost:8000/api/getuser";
  private _uploadUserPhotoUrl="http://localhost:8000/api/uploaduserphoto";



  constructor(private http:HttpClient,private _router:Router) { }

  uploadUserPhoto(formdata)
  {
    return this.http.post<any>(this._uploadUserPhotoUrl,formdata)
  }
  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user)
  }
  getUserDetail()
  {
    return this.http.post<any>(this._getuserUrl,{useremail:localStorage.getItem('email')})
  }
  updateUserDetail(user)
  {
      return this.http.post<any>(this._updateuserUrl,user)
  }
  loginUser(user)
  {
    return this.http.post<any>(this._loginUrl,user)
  }
  

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser()
  {
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    this._router.navigate([''])
  }
  getToken()
  {
    return localStorage.getItem('token')
  }

  getuserpic()
  {
    return localStorage.getItem('userpic')
  }
  getUsername()
  {
    return localStorage.getItem('username')
  }
}
