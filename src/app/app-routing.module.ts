import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { BuyComponent } from './buy/buy.component';
import { EntryComponent } from './entry/entry.component'
import { AuthGuard } from './auth.guard';
import { HousedetailComponent } from './housedetail/housedetail.component'
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
  {path:"",component:HomeComponent}, 
  {path:"entry",component:EntryComponent}, 
  {path:"buy", component:BuyComponent},//,canActivate:[AuthGuard]}
  {path:"housedetail",component: HousedetailComponent,canActivate:[AuthGuard]},
  {path:"userprofile",component: UserprofileComponent,canActivate:[AuthGuard]},
  {path:"contactus",component: ContactusComponent}


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
