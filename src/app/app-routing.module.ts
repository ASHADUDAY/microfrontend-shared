import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component'
import { APP_BASE_HREF } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimaryNavComponent } from './primary-nav/primary-nav.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth-guard';


const routes: Routes = [
  { path: '',canActivate :[AuthGuard] ,component: LoginComponent },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', canActivate :[AuthGuard] , component: DashboardComponent },
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppRoutingModule { }
