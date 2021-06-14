import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberCountReportsComponent } from './subscriber-count-reports.component';

describe('SubscriberCountReportsComponent', () => {
  let component: SubscriberCountReportsComponent;
  let fixture: ComponentFixture<SubscriberCountReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberCountReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberCountReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
