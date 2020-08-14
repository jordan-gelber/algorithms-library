import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AlgorithmDetailsComponent } from './algorithms/algorithm-details/algorithm-details.component';
import { AlgorithmListComponent } from './algorithms/algorithm-list/algorithm-list.component';
import { NewAlgorithmComponent } from './algorithms/new-algorithm/new-algorithm.component';
import { EditAlgorithmComponent } from './algorithms/edit-algorithm/edit-algorithm.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AlgorithmDetailsComponent,
    AlgorithmListComponent,
    NewAlgorithmComponent,
    EditAlgorithmComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
