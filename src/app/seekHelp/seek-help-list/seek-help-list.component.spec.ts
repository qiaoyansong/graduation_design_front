import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekHelpListComponent } from './seek-help-list.component';

describe('SeekHelpListComponent', () => {
  let component: SeekHelpListComponent;
  let fixture: ComponentFixture<SeekHelpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekHelpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekHelpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
