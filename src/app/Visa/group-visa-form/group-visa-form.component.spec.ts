import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupVisaFormComponent } from './group-visa-form.component';

describe('GroupVisaFormComponent', () => {
  let component: GroupVisaFormComponent;
  let fixture: ComponentFixture<GroupVisaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupVisaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupVisaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
