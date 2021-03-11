import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsPurchasedComponent } from './goods-purchased.component';

describe('GoodsPurchasedComponent', () => {
  let component: GoodsPurchasedComponent;
  let fixture: ComponentFixture<GoodsPurchasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsPurchasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsPurchasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
