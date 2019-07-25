import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { AuthenticationService } from './authentication.service'
import { AuthService, UserModel } from 'fwk4-authentication'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
     private authSrv: AuthService //AuthenticationService
  ) { 
     console.log('AuthGuardService constructor')
       
  }

  canActivate():boolean{
     return true; //this.authSrv.isAuthenticated()
  }
}
