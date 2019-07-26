import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
   {
      path: '',
      component: MenuPage,
      children: [
         {
            path: 'contactos',
            loadChildren: '../contacts/contacts.module#ContactsPageModule'
         },
         {
            path: 'sugerencias',
            loadChildren: '../suggestions/suggestions.module#SuggestionsPageModule'
         },
         {
            path: 'configuracion',
            loadChildren: '../configuration/configuration.module#ConfigurationPageModule'
         },
         {
            path: 'home',
            loadChildren: '../home/home.module#HomePageModule'
         }
      ],
   },
   {
      path: '',
      redirectTo: '/menu/home',
      pathMatch:'full'
   }
]

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   declarations: [MenuPage]
})
export class MenuPageModule {
   constructor() {
      console.log('MenuPageModule constructor')
   }
}
