import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEditDialogComponent } from './role-edit-dialog.component';

describe('RoleEditDialogComponent', () => {
  let component: RoleEditDialogComponent;
  let fixture: ComponentFixture<RoleEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
