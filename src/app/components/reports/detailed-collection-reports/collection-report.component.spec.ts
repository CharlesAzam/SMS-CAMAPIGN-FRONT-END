import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailedCollectionReportComponent } from './collection-report.component';


describe('ReportComponent', () => {
  let component: DetailedCollectionReportComponent;
  let fixture: ComponentFixture<DetailedCollectionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedCollectionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
