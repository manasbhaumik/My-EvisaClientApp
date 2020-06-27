import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaApplicationComponent } from './visa-application.component';

describe('VisaApplicationComponent', () => {
  let component: VisaApplicationComponent;
  let fixture: ComponentFixture<VisaApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
