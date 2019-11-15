import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsPhotosComponent } from './create-news-photos.component';

describe('CreateNewsPhotosComponent', () => {
  let component: CreateNewsPhotosComponent;
  let fixture: ComponentFixture<CreateNewsPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewsPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewsPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
