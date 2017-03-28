import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../sarlacc-client/user.service';
import { User } from '../sarlacc-client/user';
import { Broadcaster } from '../sarlacc-client/broadcaster';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ],
  providers: []
})
export class HomeComponent implements OnInit {

  user: User;

  private creatingFolder = false;
  private homeLoading = false;

  private tested = false;

  private testing = false;
  private results = 'Click Test to see your results';
  private imageAddr = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/A_new_map_of_Great_Britain_according_to_the_newest_and_most_exact_observations_%288342715024%29.jpg'; 
  private downloadSize = 107726177; //bytes
  private endTime = 0;
  private startTime = 0;
  private download = new Image();

  constructor(
    private userSvc: UserService,
    private broadcaster: Broadcaster
  ){}

  ngOnInit(): void {
    this.homeLoading = true;
    this.userSvc.returnUser()
    .then((user:User) => {
      this.user = user;
      this.homeLoading = false;
    }).catch((res:any) => {
      console.log('User is not logged in');
      this.homeLoading = false;
    });

    this.listenForLogin();
    this.listenForLogout();
  }

  listenForLogin(): void {
   this.broadcaster.on<string>(this.userSvc.LOGIN_BCAST)
    .subscribe(message => {
      this.userSvc.returnUser()
      .then((user:User) => {
        this.user = user;
        this.homeLoading = false;
      }).catch((res:any) => {
        console.log('User is not logged in');
        this.homeLoading = false;
      });
    });
  }

  listenForLogout(): void {
    this.broadcaster.on<string>(this.userSvc.LOGOUT_BCAST)
    .subscribe(message => {
      this.user = null;
    });
  }

  testNetwork(): void {

    this.testing = true;
    
    let endTime = 0;
    let startTime = 0;
    let dlSize = this.downloadSize;
    let results = this.results;
    let msg = '';

    this.download = new Image();

    let onLoad = ():void => {
      endTime = (new Date()).getTime();
      let duration = (endTime - startTime) / 1000;
      let bitsLoaded = dlSize * 8;
      let speedBps:any = (bitsLoaded / duration).toFixed(2);
      let speedKbps:any = (speedBps / 1024).toFixed(2);
      let speedMbps = (speedKbps / 1024).toFixed(2);

      let msg = "Your connection speed is: " + speedMbps + " Mbps";
      console.log(msg);
      this.results = msg;
      this.testing = false;
    }

    this.download.onload = onLoad;

    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    this.download.src = this.imageAddr + cacheBuster;

  }
  

}