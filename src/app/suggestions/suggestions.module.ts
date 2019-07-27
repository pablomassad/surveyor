import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { OrderModule } from 'ngx-order-pipe'

import { SuggestionsPage } from './suggestions'
import { PipesModule } from '../shared/pipes/pipes.module';

const routes: Routes = [
   {
      path: '',
      component: SuggestionsPage
   }
];

@NgModule({
   imports: [
      PipesModule,
      CommonModule,
      OrderModule,
      RouterModule.forChild(routes),
   ],
   declarations: [ SuggestionsPage ]
})

export class SuggestionsPageModule {
   constructor() {
      console.log('SuggestionsPageModule constructor');
   }
};