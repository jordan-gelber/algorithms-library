import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Algorithm } from '../algorithm';
import { AlgorithmService } from '../algorithm.service';

@Component({
  selector: 'app-new-algorithm',
  templateUrl: './new-algorithm.component.html',
  styleUrls: ['./new-algorithm.component.css']
})
export class NewAlgorithmComponent implements OnInit {

  constructor(
    private algorithmService: AlgorithmService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    let name = title.replace(/\s/g, '-').toLowerCase();
    this.algorithmService.addAlgorithm({ name, title } as Algorithm)
      .subscribe(algorithm => {
        console.log(`algorithm created ${algorithm.title}`);
        this.router.navigate([`/algorithms/${algorithm.name}`]);
      });
  }


}
