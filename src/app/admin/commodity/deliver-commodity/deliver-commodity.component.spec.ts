import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverCommodityComponent } from './deliver-commodity.component';

describe('DeliverCommodityComponent', () => {
  let component: DeliverCommodityComponent;
  let fixture: ComponentFixture<DeliverCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
