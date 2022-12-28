import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeftSidebarComponent } from './layouts/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './layouts/right-sidebar/right-sidebar.component';
import { LogoComponent } from './components/logo/logo.component';
import { UsersComponent } from './pages/users/users.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    LogoComponent,
    UsersComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
