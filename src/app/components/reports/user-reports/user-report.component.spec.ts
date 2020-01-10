import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserReportComponet } from './user-report.component';


describe('ReportComponent', () => {
  let component: UserReportComponet;
  let fixture: ComponentFixture<UserReportComponet>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportComponet ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
