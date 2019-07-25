import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';


const TOKEN_KEY = 'auth-token'

@Injectable({
   providedIn: 'root'
})
export class AuthenticationService {
   authenticationState = new BehaviorSubject(false)

   constructor(
      private storage: Storage,
      private platform: Platform
   ) { 
      console.log('AuthenticationService constructor')
      this.platform.ready().then(()=>{
         this.checkToken()
      })  
   }

   login(){
      return this.storage.set(TOKEN_KEY, 'TOKEN_KEY1234').then(x=>{
         this.authenticationState.next(true )
      })
   }
   logout(){
      return this.storage.remove(TOKEN_KEY).then(x=>{
         this.authenticationState.next(false )
      })
       
   }
   isAuthenticated (){
      return this.authenticationState.value 
   }
   checkToken(){
      return this.storage.get(TOKEN_KEY).then(x=>{
         if (x)
            this.authenticationState.next(true )
      })
   }

}
