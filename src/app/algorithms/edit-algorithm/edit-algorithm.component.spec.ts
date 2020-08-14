import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlgorithmComponent } from './edit-algorithm.component';

describe('EditAlgorithmComponent', () => {
  let component: EditAlgorithmComponent;
  let fixture: ComponentFixture<EditAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
