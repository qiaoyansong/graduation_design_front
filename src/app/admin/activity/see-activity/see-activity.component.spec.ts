import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeActivityComponent } from './see-activity.component';

describe('SeeActivityComponent', () => {
  let component: SeeActivityComponent;
  let fixture: ComponentFixture<SeeActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
