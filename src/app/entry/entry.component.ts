import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let target;
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('disp'))
    {
        let param = searchParams.get('disp')
        if(param=="signin")
        {
            
            $('.signup').hide();
            $('.signin').show();
        }
        if(param=="signup")
        {
            $('.signin').hide();
            $('.signup').show();
        }
    }
    $('.link a').on('click', function (e) {
        e.preventDefault();
        target = $(this).attr('href');
        
        //$(target).show(1000);
        console.log(target);
        if(target=="#signin")
        {
            $('.signup').hide(100);
            $('.signin').fadeIn(700);
            document.title="signin";
        }
        else
        {
            $('.signin').hide();
            $('.signup').fadeIn(700);
            document.title="signup";
        }
    });
  }

}
