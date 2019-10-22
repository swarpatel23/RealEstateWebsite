import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BuyComponent } from './buy/buy.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryComponent } from './entry/entry.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { HousedetailComponent } from './housedetail/housedetail.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ContactusComponent } from './contactus/contactus.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { CarousalComponent } from './carousal/carousal.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuyComponent,
    FooterComponent,
    EntryComponent,
    HousedetailComponent,
    UserprofileComponent,
    ContactusComponent,
    CarousalComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ScrollingModule,
    CountdownTimerModule.forRoot()
  ],
  providers: [AuthService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [CarousalComponent]

})
export class AppModule { }
