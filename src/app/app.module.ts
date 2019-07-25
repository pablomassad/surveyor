import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire'
// import { AngularFirestoreModule } from '@angular/fire/firestore'
// import { AngularFireAuthModule } from '@angular/fire/auth'

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx'

import { IonicStorageModule } from '@ionic/storage';
import { Fwk4AuthenticationModule } from 'fwk4-authentication'

@NgModule({
   declarations: [AppComponent],
   entryComponents: [],
   imports: [
      IonicStorageModule.forRoot(),
      Fwk4AuthenticationModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      // AngularFireAuthModule,
      // AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
   ],
   providers: [
      StatusBar,
      SplashScreen,
      Facebook,
      GooglePlus,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
