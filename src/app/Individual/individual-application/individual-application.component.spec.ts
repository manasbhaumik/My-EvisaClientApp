import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualApplicationComponent } from './individual-application.component';

describe('IndividualApplicationComponent', () => {
  let component: IndividualApplicationComponent;
  let fixture: ComponentFixture<IndividualApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
