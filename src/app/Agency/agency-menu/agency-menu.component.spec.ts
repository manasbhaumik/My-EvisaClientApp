import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyMenuComponent } from './agency-menu.component';

describe('AgencyMenuComponent', () => {
  let component: AgencyMenuComponent;
  let fixture: ComponentFixture<AgencyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
