import { Component, OnInit } from '@angular/core'
import { UserModel, Fwk4AuthenticationModule, AuthService } from 'fwk4-authentication'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { Router } from '@angular/router'

import * as firebase from 'firebase';

@Component({
   selector: 'app-home',
   templateUrl: './home.page.html',
   styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   user: UserModel = new UserModel()
   
   constructor(
      private route: Router,
      private authSrv: AuthService,
      private glboalSrv: GlobalService
   ) {
      console.log('HomePage constructor')
   }

   ngOnInit() {
      this.glboalSrv.getItem('user').then(u=>{
         this.user = u
      })
   }
   async logout() {
      await this.authSrv.doLogout()
      this.route.navigate(['/login'])
   }  
}
