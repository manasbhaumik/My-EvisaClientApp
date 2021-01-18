import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSummaryInfoComponent } from './applicant-summary-info.component';

describe('ApplicantSummaryInfoComponent', () => {
  let component: ApplicantSummaryInfoComponent;
  let fixture: ComponentFixture<ApplicantSummaryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantSummaryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantSummaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
