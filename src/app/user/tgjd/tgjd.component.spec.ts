import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgjdComponent } from './tgjd.component';

describe('TgjdComponent', () => {
  let component: TgjdComponent;
  let fixture: ComponentFixture<TgjdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgjdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgjdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
