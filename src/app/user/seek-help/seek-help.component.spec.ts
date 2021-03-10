import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekHelpComponent } from './seek-help.component';

describe('SeekHelpComponent', () => {
  let component: SeekHelpComponent;
  let fixture: ComponentFixture<SeekHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
