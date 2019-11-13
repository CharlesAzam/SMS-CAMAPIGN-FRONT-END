import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelsComponent } from './create-channels.component';

describe('CreateChannelsComponent', () => {
  let component: CreateChannelsComponent;
  let fixture: ComponentFixture<CreateChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
