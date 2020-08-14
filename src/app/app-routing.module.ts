import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AlgorithmListComponent } from './algorithms/algorithm-list/algorithm-list.component';
import { NewAlgorithmComponent } from './algorithms/new-algorithm/new-algorithm.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'algorithms',
    component: AlgorithmListComponent
  },
  {
    path: 'new',
    component: NewAlgorithmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
