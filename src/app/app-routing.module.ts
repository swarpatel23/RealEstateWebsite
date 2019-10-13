import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { BuyComponent } from './buy/buy.component';
import { EntryComponent } from './entry/entry.component'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent}, 
  {path:"entry",component:EntryComponent}, 
  {path:"buy", component:BuyComponent}//,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
