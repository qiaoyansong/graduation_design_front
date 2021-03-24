import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekHelpJdComponent } from './seek-help-jd.component';

describe('SeekHelpJdComponent', () => {
  let component: SeekHelpJdComponent;
  let fixture: ComponentFixture<SeekHelpJdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekHelpJdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekHelpJdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
