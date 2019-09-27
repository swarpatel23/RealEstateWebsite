import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./sal.css']
})
export class HomeComponent implements OnInit {

  city_list:string[] = ["Mumbai","Surat","Pune","Jaipur","Lucknow","Kanpur"];
  selectedcity:string = "";

  search_field:string = "";

  search_address()
  {
      console.log(this.selectedcity);
      console.log(this.search_field);
  }
  constructor() { }

  ngOnInit() {
  }

}
