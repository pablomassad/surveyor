import { NgModule } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { SocialSharing } from '@ionic-native/social-sharing/ngx'
import { EditEventPage } from './editEvent'
import { SharedModule } from '../shared/shared.module'


@NgModule({

   imports: [
      SharedModule.forRoot(),
      CommonModule
   ],
   declarations: [EditEventPage],
   exports: [EditEventPage],
   providers: [SocialSharing]
})

export class EditEventPageModule {
   constructor() {
      console.log('EditEventPageModule constructor');
   }
};