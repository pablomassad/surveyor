import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from 'fwk4-services'

@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html'
})
export class AppComponent {
   constructor(
      private platform: Platform,
      private globalSrv: GlobalService,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar
   ) {
      this.initializeApp()
   }

   initializeApp() {
      this.platform.ready().then(async () => {
         const isMobile = (this.platform.is('cordova'))
         await this.globalSrv.setItem('isMobile', isMobile)

         this.statusBar.styleDefault()
         this.splashScreen.hide()
      })
   }
}
