import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSummaryInfoComponent } from './payment-summary-info.component';

describe('PaymentSummaryInfoComponent', () => {
  let component: PaymentSummaryInfoComponent;
  let fixture: ComponentFixture<PaymentSummaryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSummaryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSummaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
