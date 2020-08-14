import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-panels',
  template: `<ng-content></ng-content>`,
  styles: [':host { flex: 1; flex-direction: column; }']
})
export class PanelsComponent implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {
    // Subscribe to every panel's toggle event
    this.panels.toArray().forEach((panel) => {
      panel.toggle.subscribe(() => {
        this.openPanel(panel);
      });
    });
  }

  openPanel(panel: PanelComponent) {
    if (panel.opened) {
      // if clicked panel is open, close panel
      panel.opened = false;
    } else {
      // if clicked panel is closed, close any open
      // panels and open clicked panel
      this.panels.toArray().forEach(p => p.opened = false);
      panel.opened = true;
    }
  }
}
