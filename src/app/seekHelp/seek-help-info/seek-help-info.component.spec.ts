import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekHelpInfoComponent } from './seek-help-info.component';

describe('SeekHelpInfoComponent', () => {
  let component: SeekHelpInfoComponent;
  let fixture: ComponentFixture<SeekHelpInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekHelpInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekHelpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
