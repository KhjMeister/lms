import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
        {
          path: 'users',
          component: UsersComponent,
        },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
      ],
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
