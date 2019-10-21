import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.css']
})
export class CarousalComponent implements OnInit {

  imgarr:string[];
  hcover:string;
  subphoto:string[];

  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.currentImg.subscribe(img=>{
      this.imgarr = img;
      this.hcover = img[0];      
      this.subphoto = [];
      for (let index = 0; index < img.length; index++) {
        const element = img[index];
        this.subphoto.push(element);
        
      }
    })
  }

}
