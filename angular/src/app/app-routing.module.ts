import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const routes: Routes = [
    {
        path: 'landing',
        loadChildren: () =>
            import('./modules/landing/landing.module').then((m) => m.LandingModule),
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./modules/user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.User] }
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./modules/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'instructor',
        loadChildren: () =>
            import('./modules/instructor/instructor.module').then((m) => m.InstructorModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.Instructor] }
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
export class AppRoutingModule { }
