import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeNewsComponent } from './see-news.component';

describe('SeeNewsComponent', () => {
  let component: SeeNewsComponent;
  let fixture: ComponentFixture<SeeNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
