import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  constructor() { 
     console.log('ConfigurationPage constructor')
  }

  ngOnInit() {
     console.log('ConfigurationPage init')
  }

}
