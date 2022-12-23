import { Component } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { User, Role } from '@app/_models';
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})

export class AdminComponent {
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
}