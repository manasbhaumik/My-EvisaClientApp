import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioMetricInfoComponent } from './bio-metric-info.component';

describe('BioMetricInfoComponent', () => {
  let component: BioMetricInfoComponent;
  let fixture: ComponentFixture<BioMetricInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioMetricInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioMetricInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
