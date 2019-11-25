import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguelistComponent } from './leaguelist.component';

describe('LeaguelistComponent', () => {
  let component: LeaguelistComponent;
  let fixture: ComponentFixture<LeaguelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaguelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
