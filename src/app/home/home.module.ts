import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Fwk4PipesModule } from 'fwk4-pipes'
import { OrderModule } from 'ngx-order-pipe'
import { Routes, RouterModule } from '@angular/router'
import { ToolHeadComponentModule } from '../shared/components/tool-head/tool-head.module'
import { SocialSharing } from '@ionic-native/social-sharing/ngx'
import { HomePage } from './home.page'
import { EventPage } from './event.page';


const routes: Routes = [
   {
      path: '',
      component: HomePage
   }
];

@NgModule({
   imports: [
      Fwk4PipesModule,
      OrderModule,
      ToolHeadComponentModule,
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   entryComponents: [
       EventPage
   ],
   declarations: [HomePage, EventPage],
   providers:[SocialSharing]
})
export class HomePageModule {
   constructor() {
      console.log('HomePageModule constructor')
   }
}
