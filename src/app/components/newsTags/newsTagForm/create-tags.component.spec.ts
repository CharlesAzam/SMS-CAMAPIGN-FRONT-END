import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTagsComponent } from './newsTagForm.component';

describe('CreateTagsComponent', () => {
  let component: CreateTagsComponent;
  let fixture: ComponentFixture<CreateTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
