import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlgorithmService } from '../algorithm.service';
import { Algorithm } from '../algorithm';

@Component({
  selector: 'app-edit-algorithm',
  templateUrl: './edit-algorithm.component.html',
  styleUrls: ['./edit-algorithm.component.css']
})
export class EditAlgorithmComponent implements OnInit {
  algorithm: Algorithm;
  algorithms: Algorithm[];
  editor: boolean = false;
  editSubVisible: boolean = false;
  createSubVisible: boolean = false;
  selectedSub: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private algorithmService: AlgorithmService
  ) { }

  ngOnInit(): void {
    this.getAlgorithms();
    this.route.params.subscribe(routeParams => {
    	this.getAlgorithm(routeParams.name);
    });
  }

  getAlgorithm(name: string): void {
    this.algorithmService.getAlgorithmByName(name)
      .subscribe(algorithm => this.algorithm = algorithm);
  }

  getAlgorithms(): void {
    this.algorithmService.getAlgorithms()
      .subscribe(algorithms => this.algorithms = algorithms);
  }

  back(): void {
    this.location.back();
  }

  save(): void {
    this.algorithmService.updateAlgorithm(this.algorithm)
      .subscribe(() => {
        this.router.navigateByUrl(`/algorithms/${this.algorithm.name}`);
      });
  }

  editSubroutine(): void {
    if (this.algorithm.subroutine) {
      this.selectedSub = this.algorithm.subroutine.subname.concat(',');
      this.selectedSub = this.selectedSub.concat(this.algorithm.subroutine.subtitle);
    }
    this.editSubVisible = true;
  }

  saveSubroutine(selectedSub: string): void {
    this.editSubVisible = false;
    let temp = selectedSub.split(",");
    if (temp[0] !== "no") {
      this.algorithm.subroutine = {subname: temp[0], subtitle: temp[1]};
    } else {
      this.algorithm.subroutine = null;
    }
  }

}
