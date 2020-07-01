import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSuggestionConfigComponent } from './content-suggestion-config.component';

describe('ContentSuggestionConfigComponent', () => {
  let component: ContentSuggestionConfigComponent;
  let fixture: ComponentFixture<ContentSuggestionConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentSuggestionConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSuggestionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
