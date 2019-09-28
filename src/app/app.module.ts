import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BuyComponent } from './buy/buy.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { EntryComponent } from './entry/entry.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuyComponent,
    FooterComponent,
    EntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
