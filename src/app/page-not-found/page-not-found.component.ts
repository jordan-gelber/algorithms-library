import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<div class="not-found-container" fxLayout="column" fxLayoutAlign="start center">
  <h1>404: Page not found!</h1></div>`
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
