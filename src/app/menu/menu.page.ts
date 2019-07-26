import { Component, OnInit } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { GlobalService } from 'fwk4-services'

@Component({
   selector: 'app-menu',
   templateUrl: './menu.page.html',
   styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
   selectedPath = '/menu/pacientes'
   pages = [
      {
         title: "Pacientes",
         url: "/menu/pacientes"
      }
   ]

   constructor(
      private globalSrv: GlobalService,
      private router: Router
   ) {
      console.log('MenuPage constructor')
      this.router.events.subscribe((event: RouterEvent) => {
         if (event && event.url && (event.url != '')) {
            this.selectedPath = event.url
         }
      })
   }

   async ngOnInit() {
      const usr = await this.globalSrv.getItem('userInfo')
      if (usr.isAdmin) {
         this.pages.push({
            title: "Eventos",
            url: "/menu/eventos"
         })
         this.pages.push({
            title: "Sugerencias",
            url: "/menu/sugerencias"
         })         
         this.pages.push({
            title: "Configuración",
            url: "/menu/configuracion"
         })
         this.pages.push({
            title: "Bajar App",
            url: "/menu/download"
         })
         // {
         //    text: 'Bajar App',
         //    handler: () => {
         //       console.log('Download App!!!');
         //       window.open('https://firebasestorage.googleapis.com/v0/b/events-12be3.appspot.com/o/MeetingMaster.apk?alt=media&token=66af8eb0-463c-44ed-a596-5a7b21ff5d8a', '_system')
         //    }
         // },
      }
   }
}
