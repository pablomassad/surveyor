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
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireStorageModule } from '@angular/fire/storage'

import { IonicStorageModule } from '@ionic/storage'
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { GooglePlus } from '@ionic-native/google-plus/ngx'
import { Facebook } from '@ionic-native/facebook/ngx'



@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig), // imports firebase/app
      AngularFirestoreModule, // imports firebase/firestore
      AngularFireAuthModule, // imports firebase/auth
      AngularFireStorageModule, // imports firebase/storage
      AppRoutingModule, 
   ],
   providers: [
      StatusBar,
      SplashScreen,
      Facebook,
      GooglePlus,
      WebView,
      { provide: FirestoreSettingsToken, useValue: {} },
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
   constructor(){
      console.log('AppModule constructor')
   }
 }
