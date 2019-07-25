import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
   {
      path: 'members',
      canActivate: [AuthGuardService],
      loadChildren: './members/member-routing.module#MemberRoutingModule'
   },
   { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate:[AuthGuardService] }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
   ],
   exports: [RouterModule]
})
export class AppRoutingModule {
   constructor() {
      console.log('AppRoutingModule constructor')
   }
 }
