import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  @Input() opened: boolean = false;
  @Input() paneltitle: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
