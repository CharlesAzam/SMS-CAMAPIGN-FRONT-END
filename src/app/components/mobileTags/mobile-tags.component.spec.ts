import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTagsComponent } from './mobile-tags.component';

describe('MobileTagsComponent', () => {
  let component: MobileTagsComponent;
  let fixture: ComponentFixture<MobileTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
