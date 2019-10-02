import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title:string = 'realtor';
  public signedin:boolean=false;
 
  onActivate(componentReference) {
    console.log(componentReference)
    componentReference.signin();
    //Below will subscribe to the searchItem emitter
    componentReference.searchItem.subscribe((data) => {
       // Will receive the data from child here 
       console.log(data);
    })
 }
}
