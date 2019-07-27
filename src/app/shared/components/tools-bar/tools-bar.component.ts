import { Component, OnInit, OnDestroy, Input } from '@angular/core'

@Component({
  selector: 'tools-bar',
  templateUrl: 'tools-bar.component.html'
})
export class ToolsBarComponent implements OnInit, OnDestroy {
  @Input() title;

  constructor() {
    console.log('ToolsBarComponent constructor');
  }

  ngOnDestroy() {
    console.warn('ToolsBarComponent destroy');
  }
  ngOnInit(): void {
    console.log('ToolsBarComponent init');
  }
}
