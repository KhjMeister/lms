import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeftSidebarComponent } from './layouts/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './layouts/right-sidebar/right-sidebar.component';
import { SearchComponent } from './components/search/search.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { PopularComponent } from './components/popular/popular.component';
import { LogoComponent } from './components/logo/logo.component';


@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    SearchComponent,
    FavoriteComponent,
    PopularComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
