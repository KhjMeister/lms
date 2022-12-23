import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { User, Role } from '@app/_models';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  user?: User | null;

  constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isUser() {
      return this.user?.role === Role.User;
  }

  get isAdmin() {
      return this.user?.role === Role.Admin;
  }

  get isInstructor() {
      return this.user?.role === Role.Instructor;
  }

  logout() {
      this.authenticationService.logout();
  }

  ngOnInit(): void {
  }

}
