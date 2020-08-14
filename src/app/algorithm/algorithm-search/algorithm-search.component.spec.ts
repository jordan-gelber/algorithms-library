import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmSearchComponent } from './algorithm-search.component';

describe('AlgorithmSearchComponent', () => {
  let component: AlgorithmSearchComponent;
  let fixture: ComponentFixture<AlgorithmSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
