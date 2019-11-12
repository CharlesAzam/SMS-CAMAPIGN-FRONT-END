import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsStoryComponent } from './create-news-story.component';

describe('CreateNewsStoryComponent', () => {
  let component: CreateNewsStoryComponent;
  let fixture: ComponentFixture<CreateNewsStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewsStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewsStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
