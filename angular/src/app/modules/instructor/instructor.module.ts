import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeftSidebarComponent } from './layouts/left-sidebar/left-sidebar.component';
import { LogoComponent } from './components/logo/logo.component';


@NgModule({
  declarations: [
    InstructorComponent,
    DashboardComponent,
    LeftSidebarComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule
  ]
})
export class InstructorModule { }
