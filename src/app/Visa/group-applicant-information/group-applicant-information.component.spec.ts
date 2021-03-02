import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApplicantInformationComponent } from './group-applicant-information.component';

describe('GroupApplicantInformationComponent', () => {
  let component: GroupApplicantInformationComponent;
  let fixture: ComponentFixture<GroupApplicantInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupApplicantInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupApplicantInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
