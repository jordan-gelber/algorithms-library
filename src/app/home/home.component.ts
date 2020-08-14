import { Component, OnInit } from '@angular/core';

import { AlgorithmService } from '../algorithms/algorithm.service';
import { Algorithm } from '../algorithms/algorithm';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  algorithms: Algorithm[];
  favoriteAlgs: Algorithm[];
  randomAlgorithm: Algorithm;

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
      this.favoriteAlgs = algorithms.slice(0, 4);
    });
  }

  random(): void {
    let random = Math.floor(Math.random() * this.algorithms.length);
    this.randomAlgorithm = this.algorithms[random];
  }
}
