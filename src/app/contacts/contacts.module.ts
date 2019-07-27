import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OrderModule } from 'ngx-order-pipe'
import { IonicModule } from '@ionic/angular'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { ContactsPage } from './contacts'
import { SharedModule } from '../shared/shared.module'
import { PipesModule } from '../shared/pipes/pipes.module';

const routes: Routes = [
   {
     path: '',
     component: ContactsPage
   }
 ];

@NgModule({
   imports: [
      IonicModule,
      SharedModule.forRoot(),
      PipesModule,
      CommonModule,
      FormsModule,
      OrderModule,
      RouterModule.forChild(routes)
   ],
   declarations: [ContactsPage]
})

export class ContactsPageModule {
   constructor() {
      console.log('ContactsPageModule constructor');
   }
};