import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { Router } from '@angular/router'
import { AlertController,ModalController } from '@ionic/angular'
import { DBService } from '../shared/services/db.service'
import { Subscription } from 'rxjs'
import { EventPage } from './event.page';

@Component({
   selector: 'app-home',
   templateUrl: './home.page.html',
   styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
   idevt: string
   title: string = "Meeting Master"
   userInfo: any
   community: any[]
   contactsFull: any[]
   events: any
   photoPath: string
   today: number = new Date().getTime()
   searchText: string
   sortField: string = 'creationDate'
   direction: boolean = false

   private subNotify: Subscription
   private subEvt: Subscription
   private subCom: Subscription

   constructor(
      // private fcmSrv: FCMService,
      private route: Router,
      private alertCtrl: AlertController,
      private appSrv: ApplicationService,
      private globalSrv: GlobalService,
      private modalCtrl: ModalController,
      private fs: DBService
   ) {
      console.log('HomePage contructor')
   }

   ngOnInit() {
      console.log('HomePage init')
      this.userInfo = this.globalSrv.getItemRAM('userInfo')
      const isMobile = this.globalSrv.getItemRAM('isMobile')
      // if (isMobile) {
      //    this.fcmSrv.initFCM(this.userInfo.id)
      //    this.fcmSrv.getToken()
      //    this.appSrv.message('user: ' + this.userInfo.displayName)
      //    this.fcmSrv.subscribeTopic(this.userInfo.id)
      //    this.fcmSrv.listenOnNotification().subscribe(o => {
      //       this.appSrv.message('Mensaje recibido!!!', 'info')
      //       console.log('msg received: ', o)
      //       //this.evalNotification(o);
      //    })
      // }

      //this.notifyMemberInEvent(this.userInfo.id)
      this.subEvt = this.fs.getEventsByUid(this.userInfo.id).subscribe(data => {
         this.events = data
      })
      this.subCom = this.fs.getCommunity().subscribe(data => {
         this.community = data
         this.contactsFull = this.getContactsFull()
      })
      console.log('subEvt: ', this.subEvt.closed)
      console.log('subCom: ', this.subCom.closed)
   }
   ngOnDestroy() {
      console.log('HomePage destroy')
      if (this.subCom) this.subCom.unsubscribe()
      if (this.subEvt) this.subEvt.unsubscribe()
      if (this.subNotify) this.subNotify.unsubscribe()
   }
   showUserInfo() {
      this.appSrv.message('Usuario logueado: ', this.userInfo.displayName)
   }
   doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
         console.log('Async operation has ended');
         refresher.complete();
      }, 2000);
   }
   async addEvent() {
      this.showEditEvent('Nuevo Evento', { members: [] })
   }
   async editEvent(ev, i) {
      this.showEditEvent('Editar Evento', ev)
   }
   showEvent(ev, i) {
      this.route.navigate(['EventPage'])
   }
   async removeEvent(ev, i) {
      const alert = await this.alertCtrl.create({
         header: 'Confirmación',
         message: 'Esta seguro de eliminar este evento?',
         buttons: [
            {
               text: 'No',
               role: 'cancel',
               handler: () => {
               }
            },
            {
               text: 'Si',
               handler: () => {
                  if (ev.owner === this.userInfo.id)
                     this.fs.deleteEvent(ev)
                  else {
                     ev.members[this.userInfo.id] = false
                     this.fs.updateUser(ev)
                  }
               }
            }
         ]
      })
      alert.present()
   }
   evalTypeIcon(t) {
      let src = ""
      switch (t) {
         case "calendario":
            src = "assets/imgs/cal.png"
            break;
         case "seleccion":
            src = "assets/imgs/seleccion.png"
            break;
         case "votacion":
            src = "assets/imgs/votacion.png"
            break;
         default:
            break;
      }
      return src
   }
   getSortedEvents(sort) {
      this.sortField = sort
      this.direction = !this.direction
   }
   getSortName() {
      if (this.sortField === "creationDate")
         return "Fecha"
      else
         return "Evento"
   }
   getIcon() {
      if (this.direction === true)
         return "arrow-dropdown"
      else
         return "arrow-dropup"
   }

   private evalNotification(data) {
      // if (data.type == "PRUEBA_LINEA") {
      //    this.updateAlerts('LineaPage', data);
      // }
      // if (data.type == "PRUEBA_ADSL") {
      //    this.updateAlerts('ADSLPage', data);
      // }
      // if (data.type == "PRUEBA_SELT") {
      //    this.updateAlerts('NACPage', data);
      // }
      // if (data.type == "CAMBIO_PORT") {
      //    this.updateAlerts('CambioPortPage', data);
      // }
      // if (data.type == "CONFIG") {
      //    if (data.urlBase) {
      //       this.globalSrv.save('urlBase', data.urlBase);
      //    }
      // }
   }
   private notifyMemberInEvent(id) {
      // try {
      //    if (!idEvtParam) return
      //    this.subNotify = this.http.get<any>('https://us-central1-events-12be3.cloudfunctions.net/notifyMember/' + idEvtParam + '/' + id)
      //       .subscribe(o => {
      //          console.log('Notify ok: ', o)
      //       })
      // } catch (error) {
      //    console.log(error)
      // }
   }
   private async showEditEvent(tit, ev) {
      const modal = await this.modalCtrl.create({
         component: EventPage,
         componentProps: {
            title: tit,
            evt: ev,
            contactsFull: this.contactsFull
          }
      })
      return await modal.present()
   }
   private getContactsFull() {
      const lst: any = []
      if (this.userInfo.contacts) {
         this.community.forEach(p => {
            const sel = (this.userInfo.contacts[p.id])
            if (sel == true) {
               lst.push(p)
            }
         });
      }
      return lst
   }
   private getMembersFull(ev) {
      const lst: any = []
      if (ev.members) {
         Object.keys(ev.members).forEach(m => {
            const mem = this.community.find(c => c.id == m)
            if (mem)
               lst.push(mem)
         })
         // this.community.forEach(p => {
         //    const sel = (ev.members[p.id])
         //    if (sel == true) {
         //       lst.push(p)
         //    }
         // });
      }
      return lst
   }
}
