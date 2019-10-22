import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private _checkstatus = "http://localhost:8000/api/checkStatus";
  private _setstatus = "http://localhost:8000/api/setStatus";
  private _rejectstatus = "http://localhost:8000/api/setStatus";
  private _sendmail="http://localhost:8000/api/sendmail";
  private _checkmeetings="http://localhost:8000/api/checkMeetings";
  constructor(private http:HttpClient) { }
  
  sendmail(app,user)
  {
    app={
      appid:app.appid,
      auser:user
    }
    return this.http.post<any>(this._sendmail,app)
  }
  checkStatus(user_id:string):any
  {
    console.log('user_id :', user_id);
    let params = new HttpParams();
    params = params.append('user_id',user_id);
    return this.http.get<any>(this._checkstatus,{params:params});
  }
  setStatus(appointment_id,date):any
  {        
    let params = {appointment_id:appointment_id,date:date,status:true};
    console.log('params :', params);
    return this.http.post<any>(this._setstatus,params);
  }
  rejectStatus(appointment_id,date):any
  {        
    let params = {appointment_id:appointment_id,date:date,status:false};
    console.log('params :', params);
    return this.http.post<any>(this._rejectstatus,params);
  }

  checkMeetings(user_id:string):any{
    console.log('user_id :', user_id);
    let params = new HttpParams();
    params = params.append('user_id',user_id);
    return this.http.get<any>(this._checkmeetings,{params:params});
  }

}
