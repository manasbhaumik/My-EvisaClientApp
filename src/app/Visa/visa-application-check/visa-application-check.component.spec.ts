import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaApplicationCheckComponent } from './visa-application-check.component';

describe('VisaApplicationCheckComponent', () => {
  let component: VisaApplicationCheckComponent;
  let fixture: ComponentFixture<VisaApplicationCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaApplicationCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaApplicationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
