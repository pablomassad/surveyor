
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavParams, Events, ModalController, Platform, AlertController } from '@ionic/angular';
import { ApplicationService, GlobalService } from 'fwk4-services'
import { SocialSharing } from '@ionic-native/social-sharing/ngx'

import * as moment from 'moment'
import { DBService } from '../shared/services/db.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy {
   title: string
   evt: any
   question: string
   answerType: string
   selectionItemsKeys: string[]
   newItem: string

   private selectionItems: object = {}
   private userInfo: any
   private contactsFull: any[]

   constructor(
      private globalSrv: GlobalService,
      private modalController: ModalController,
      private alertCtrl: AlertController,
      private platform: Platform,
      private navParams: NavParams,
      private appSrv: ApplicationService,
      private fs: DBService,
      private socialSharing: SocialSharing
   ) {
      console.log('EditEventPage constructor')
   }
   ngOnDestroy() {
      console.warn('EditEventPage destroy')
   }
   ngOnInit(): void {
      console.log('EditEventPage init')
      this.userInfo = this.globalSrv.getItemRAM('userInfo')
      this.title = this.navParams.get('title')
      this.evt = this.navParams.get('evt')
      this.contactsFull = this.navParams.get('contactsFull')

      this.evt.owner = this.userInfo.uid
      this.evt.ownerName = this.userInfo.displayName
      this.evt.ownerPhotoURL = this.userInfo.photoURL
      this.setMembersToContacts()

      this.question = (this.evt.question) ? this.evt.question : ""
      if (this.evt.type == 'seleccion') {
         this.selectionItems = (this.evt.selectionItems) ? this.evt.selectionItems : {}
         this.updateSelectionKeys()
         this.answerType = this.evt.answerType
      }
   }
   
   adminMembers() {
      // const mod: Modal = this.modal.create('MembersPage', {
      //    title: "Miembros",
      //    owner: this.evt.owner,
      //    contactsFull: this.contactsFull
      // }, {})
      // mod.present()
      // mod.onDidDismiss(cf => {
      // })
   }
   share() {
      if (this.platform.is('cordova')) {
         //const url = 'https://events-12be3.firebaseapp.com?idevt=' + this.evt.id
         const url = 'https://events-12be3.firebaseapp.com/#' + this.evt.id

         this.socialSharing.shareViaWhatsApp('Invitacion a evento: ', '', url)
            .then(() => {
               this.appSrv.message('Se ha enviado notificacion a evento!')
            })
            .catch(err => {
               this.appSrv.message('No posee Whatsapp')
            })
      }
      // this.socialSharing.canShareViaEmail().then(() => {
      //    // Sharing via email is possible
      // }).catch(() => {
      //    // Sharing via email is not possible
      // });

      // // Share via email
      // this.socialSharing..shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      //    // Success!
      // }).catch(() => {
      //    // Error!
      // });
   }
   addItem() {
      this.selectionItems[this.newItem] = {}
      this.updateSelectionKeys()
      this.newItem = ""
   }
   removeItem(item) {
      let alert: any
      if (Object.keys(this.evt.selectionItems[item]).length > 0) {
         alert = this.alertCtrl.create({
            header: 'Aviso',
            message: 'Esta seguro de eliminar este item?',
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
                     delete this.selectionItems[item]
                     this.updateSelectionKeys()
                  }
               }
            ]
         });
      }
      else {
         alert = this.alertCtrl.create({
            header: 'Aviso',
            message: 'No es posible eliminar este item, ya hay informacion cargada',
            buttons: [
               {
                  text: 'Aceptar',
                  handler: () => {
                  }
               }
            ]
         });
      }
      alert.present();
   }
   evalDisable() {
      let res = (this.evt.name === '') || (!this.evt.type)
      // switch (this.evt.type) {
      //    case 'calendario':
      //       res = (Object.keys(this.evt.availability).length > 0)
      //       break;
      //    case 'seleccion':
      //       res = (Object.keys(this.evt.selectionItems).length > 0)
      //       break;
      // }
      return res
   }
   save() {
      this.getMembersFromContacts()
      this.evt.question = this.question
      switch (this.evt.type) {
         case 'calendario':
            this.evt.availability = {}
            break;
         case 'seleccion':
            this.evt.selectionItems = this.selectionItems
            this.evt.answerType = this.answerType
            break;
         case 'votacion':
            if (!this.evt.selectionItems) {
               this.evt.selectionItems = {}
               this.evt.selectionItems['yes'] = {}
               this.evt.selectionItems['no'] = {}
            }
            break;
      }
      this.fs.saveEvent(this.evt)
      this.modalController.dismiss()
   }
   closeModal() {
      this.modalController.dismiss()
   }

   private updateSelectionKeys() {
      this.selectionItemsKeys = Object.keys(this.selectionItems)
   }
   private setMembersToContacts() {
      this.contactsFull.forEach(item => {
         item.selected = (this.evt.members[item.uid] == true)
      })
   }
   private getMembersFromContacts() {
      this.evt.members = {}
      this.contactsFull.forEach(item => {
         if (item.selected == true)
            this.evt.members[item.uid] = true
      })
   }
}
