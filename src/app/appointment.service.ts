import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient,private _router:Router) { }
  private _setappointmet="http://localhost:8000/api/setappointment"
  setAppointment(appointmentdetail)
  {
      return this.http.post<any>(this._setappointmet,appointmentdetail)
  }
  
}
