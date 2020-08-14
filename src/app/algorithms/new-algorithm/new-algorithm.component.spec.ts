import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlgorithmComponent } from './new-algorithm.component';

describe('NewAlgorithmComponent', () => {
  let component: NewAlgorithmComponent;
  let fixture: ComponentFixture<NewAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
