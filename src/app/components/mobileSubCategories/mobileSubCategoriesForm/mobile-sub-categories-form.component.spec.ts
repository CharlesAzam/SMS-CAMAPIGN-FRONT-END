import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSubCategoriesFormComponent } from './mobile-sub-categories-form.component';

describe('MobileSubCategoriesFormComponent', () => {
  let component: MobileSubCategoriesFormComponent;
  let fixture: ComponentFixture<MobileSubCategoriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSubCategoriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSubCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
