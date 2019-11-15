import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSubCategoriesComponentComponent } from './MobileSubCategoriesComponent';

describe('MobileSubCategoriesComponentComponent', () => {
  let component: MobileSubCategoriesComponentComponent;
  let fixture: ComponentFixture<MobileSubCategoriesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSubCategoriesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSubCategoriesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
