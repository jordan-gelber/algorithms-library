import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmDetailsComponent } from './algorithm-details.component';

describe('AlgorithmDetailsComponent', () => {
  let component: AlgorithmDetailsComponent;
  let fixture: ComponentFixture<AlgorithmDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
