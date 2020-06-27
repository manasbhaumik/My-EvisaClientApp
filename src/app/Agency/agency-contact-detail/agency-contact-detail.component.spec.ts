import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyContactDetailComponent } from './agency-contact-detail.component';

describe('AgencyContactDetailComponent', () => {
  let component: AgencyContactDetailComponent;
  let fixture: ComponentFixture<AgencyContactDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyContactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
