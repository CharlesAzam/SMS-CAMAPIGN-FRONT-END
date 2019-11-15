import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsTagComponent } from './mobileTagsFormComponent';

describe('CreateNewsTagComponent', () => {
  let component: CreateNewsTagComponent;
  let fixture: ComponentFixture<CreateNewsTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewsTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
