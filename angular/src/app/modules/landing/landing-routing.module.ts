import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
    {
      path: '',
      component: LandingComponent,
      children: [
        {
          path: 'index',
          component: IndexComponent,
        },
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        // { path: '**', redirectTo: 'index', pathMatch: 'full' },
      ],
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
