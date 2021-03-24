import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekHelpDetailComponent } from './seek-help-detail.component';

describe('SeekHelpDetailComponent', () => {
  let component: SeekHelpDetailComponent;
  let fixture: ComponentFixture<SeekHelpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekHelpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekHelpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
