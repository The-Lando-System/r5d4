import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import 'hammerjs/hammer.js';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Logger } from 'angular2-logger/core';

import { Broadcaster } from './sarlacc-client/broadcaster';
import { UserService } from './sarlacc-client/user.service';
import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent
  ],
  providers: [
    Logger,
    CookieService,
    Broadcaster,
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
