import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Algorithm } from '../algorithm';
import { AlgorithmService } from '../algorithm.service';

@Component({
  selector: 'app-algorithm-search',
  templateUrl: './algorithm-search.component.html',
  styleUrls: ['./algorithm-search.component.css']
})
export class AlgorithmSearchComponent implements OnInit {

  searchValue: string;
  algorithms$: Observable<Algorithm[]>;
  searchToggle: boolean = false;

  private searchTerms = new Subject<string>();

  constructor(
    private algorithmService: AlgorithmService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.algorithms$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.algorithmService.searchAlgorithms(term)),
    );
    this.router.events.subscribe((e) => {
      if(e instanceof NavigationStart){
        this.clear();
      }
    });
  }

  // push search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  clear(): void {
    this.searchTerms.next('');
    this.searchValue = '';
  }
}
