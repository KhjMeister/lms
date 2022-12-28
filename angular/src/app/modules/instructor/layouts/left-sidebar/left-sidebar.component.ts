import { Component, OnInit } from '@angular/core';
import { AlertifyService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.less']
})
export class LeftSidebarComponent  {

  user?: User | null;

  constructor(private authenticationService: AuthenticationService,private alertify:AlertifyService,) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }


  logout() {
      this.authenticationService.logout();
      this.alertify.message('با موفقیت خارج شدید');
  }

}
