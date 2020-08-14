import { Component, OnInit } from '@angular/core';

import { AlgorithmService } from '../algorithm.service';
import { Algorithm } from '../algorithm';

@Component({
  selector: 'app-algorithm-list',
  templateUrl: './algorithm-list.component.html',
  styleUrls: ['./algorithm-list.component.css']
})
export class AlgorithmListComponent implements OnInit {

  algorithms: Algorithm[];

  constructor(
    private algorithmService: AlgorithmService
  ) { }

  ngOnInit() {
    this.getAlgorithms();
  }

  getAlgorithms(): void {
    this.algorithmService.getAlgorithms()
      .subscribe(algorithms => {
        this.algorithms = algorithms;
      });
  }

}
