import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPhotosComponent } from './news-photos.component';

describe('NewsPhotosComponent', () => {
  let component: NewsPhotosComponent;
  let fixture: ComponentFixture<NewsPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
