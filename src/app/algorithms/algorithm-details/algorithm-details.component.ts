import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AlgorithmService } from '../algorithm.service';
import { Algorithm } from '../algorithm';

@Component({
  selector: 'app-algorithm-details',
  templateUrl: './algorithm-details.component.html',
  styleUrls: ['./algorithm-details.component.css']
})
export class AlgorithmDetailsComponent implements OnInit {
  algorithm: Algorithm;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private algorithmService: AlgorithmService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
    	this.getAlgorithm(routeParams.id);
    });
  }

  getAlgorithm(id: string): void {
    this.algorithmService.getAlgorithm(id)
      .subscribe(algorithm => this.algorithm = algorithm);
  }

  back(): void {
    this.location.back();
  }

}
