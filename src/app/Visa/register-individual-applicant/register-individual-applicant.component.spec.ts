import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterIndividualApplicantComponent } from './register-individual-applicant.component';

describe('RegisterIndividualApplicantComponent', () => {
  let component: RegisterIndividualApplicantComponent;
  let fixture: ComponentFixture<RegisterIndividualApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterIndividualApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterIndividualApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
