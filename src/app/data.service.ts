import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage=this.messageSource.asObservable();

  changeMessage(signedin:boolean)
  {
    this.messageSource.next(signedin);
  }
  constructor() { }
}
