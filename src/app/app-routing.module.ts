import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AlgorithmListComponent } from './algorithms/algorithm-list/algorithm-list.component';
import { AlgorithmDetailsComponent } from './algorithms/algorithm-details/algorithm-details.component';
import { NewAlgorithmComponent } from './algorithms/new-algorithm/new-algorithm.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    path: 'algorithms/:id',
    component: AlgorithmDetailsComponent
  },
  {
    path: 'new',
    component: NewAlgorithmComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  { // Wildcard route for a 404 page
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
