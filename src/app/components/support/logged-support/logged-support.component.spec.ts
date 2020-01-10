import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedSupportComponent } from './logged-support.component';


describe('ReportComponent', () => {
  let component: LoggedSupportComponent;
  let fixture: ComponentFixture<LoggedSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
