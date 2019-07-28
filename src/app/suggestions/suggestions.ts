import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core'
import { NavParams, ModalController } from '@ionic/angular'
import { Subscription } from 'rxjs';
import { ViewController } from '@ionic/core';
import { DBService } from '../shared/services/db.service'


@Component({
   selector: 'page-suggestions',
   templateUrl: 'suggestions.html'
})
export class SuggestionsPage implements OnInit, OnDestroy {
   @ViewChild('sugLst') content: any;

   title: string
   user: any
   searchText: string
   suggestions: any = []
   newSuggestion: string = ""
   adminMode:boolean = false
   subSug: Subscription

   constructor(
      private modalController: ModalController,
      private navParams: NavParams,
      private view: ViewController,
      private fs: DBService
   ) {
      console.log('SuggestionPage constructor');
      this.title = this.navParams.get('title')
      this.user = this.navParams.get('user')
   }
   ngOnDestroy() {
      console.warn('SuggestionPage destroy');
      this.subSug.unsubscribe()
   }
   ngOnInit(): void {
      console.log('SuggestionPage init');
      this.subSug = this.fs.getSuggestions().subscribe(data => {
         this.suggestions = data
      })
   }
   ionViewDidEnter() {
      this.scrollDown()
   }
   admin(){
      this.adminMode = true
   }
   add() {
      if (this.newSuggestion != "") {
         const sg = {
            creationDate: new Date().getTime(),
            suggestion: this.newSuggestion,
            owner: this.user.uid,
            ownerName: this.user.displayName,
            photoURL: this.user.photoURL
         }
         this.fs.saveSuggestion(sg)
         this.newSuggestion = ""
      }
      this.scrollDown()
   }
   removeItem(item){
      this.fs.deleteSuggestion(item)
   }
   closeModal() {
      this.modalController.dismiss()
   }
   
   private scrollDown(){
      setTimeout(() => {
         this.content.scrollToBottom(300);
      }, 500);
   }
}
