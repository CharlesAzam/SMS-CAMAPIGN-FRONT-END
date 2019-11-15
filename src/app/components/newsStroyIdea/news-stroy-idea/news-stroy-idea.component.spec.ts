import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsStroyIdeaComponent } from './news-stroy-idea.component';

describe('NewsStroyIdeaComponent', () => {
  let component: NewsStroyIdeaComponent;
  let fixture: ComponentFixture<NewsStroyIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsStroyIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsStroyIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
