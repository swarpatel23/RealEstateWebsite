import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient,private _router:Router) { }
  private _setappointmet="http://localhost:8000/api/setappointment"
  private _getappointmet="http://localhost:8000/api/getappointment"
  private _getprofile="http://localhost:8000/api/getprofile";  
  setAppointment(appointmentdetail):any
  {
      return this.http.post<any>(this._setappointmet,appointmentdetail)
  }
  getAppointment(user_id):Observable<any>
  {
    let params = new HttpParams();
    params = params.append('user_id',user_id)
    return this.http.get<any>(this._getappointmet,{params:params})
  }
  getProfile(uid):any
  {
    let params = new HttpParams;
    params = params.append('user_id',uid)
    return this.http.get<any>(this._getprofile,{params:params})
  }
}
