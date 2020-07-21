import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationSendComponent } from './admin-notification-send.component';

describe('AdminNotificationSendComponent', () => {
  let component: AdminNotificationSendComponent;
  let fixture: ComponentFixture<AdminNotificationSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotificationSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
