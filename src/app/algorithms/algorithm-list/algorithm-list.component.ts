import { Component, OnInit } from '@angular/core';

import { AlgorithmService } from '../algorithm.service';
import { Algorithm } from '../algorithm';

@Component({
  selector: 'app-algorithm-list',
  templateUrl: './algorithm-list.component.html',
  styleUrls: ['./algorithm-list.component.css']
})
export class AlgorithmsComponent implements OnInit {

  groups = new Set<string>();

  algorithms: Algorithm[];
  filteredAlgorithms: Algorithm[];
  selectedAlg: Algorithm;
  selectedGroup: string;
  filtered: boolean = false;

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
        this.getGroups();
      });
  }

  getGroups(): void {
    for (const key of Object.keys(this.algorithms)) {
      const value = this.algorithms[key];
      this.groups.add(value.group);
    };
  }

  filterAlgorithms(group: string): void {
    if (group === "all") {
      this.filtered = false;
    } else {
      this.algorithmService.filterAlgorithms(group)
        .subscribe(algorithms => {
          this.filteredAlgorithms = algorithms;
          this.filtered = true;
        });
    }
  }

}
