import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityProcessComponent } from './activity-process.component';

describe('ActivityProcessComponent', () => {
  let component: ActivityProcessComponent;
  let fixture: ComponentFixture<ActivityProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
