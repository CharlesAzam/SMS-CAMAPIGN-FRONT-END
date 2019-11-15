import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsVideosComponent } from './newsVideos.component';

describe('CreateNewsVideosComponent', () => {
  let component: CreateNewsVideosComponent;
  let fixture: ComponentFixture<CreateNewsVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewsVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewsVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
