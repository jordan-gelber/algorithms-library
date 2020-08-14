import { Component, OnInit } from '@angular/core';

import { Algorithm } from '../algorithm';
import { AlgorithmService } from '../algorithm.service';

@Component({
  selector: 'app-new-algorithm',
  templateUrl: './new-algorithm.component.html',
  styleUrls: ['./new-algorithm.component.css']
})
export class NewAlgorithmComponent implements OnInit {

  constructor(
    private algorithmService: AlgorithmService
  ) { }

  ngOnInit(): void {
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.algorithmService.addAlgorithm({ name } as Algorithm)
      .subscribe(algorithm => {
        console.log(`algorithm created ${algorithm.name}`);
        // this.router.navigate([`/algorithms/${algorithm.id}`]);
      });
  }


}
