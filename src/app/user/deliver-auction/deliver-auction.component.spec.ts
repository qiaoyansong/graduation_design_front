import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverAuctionComponent } from './deliver-auction.component';

describe('DeliverAuctionComponent', () => {
  let component: DeliverAuctionComponent;
  let fixture: ComponentFixture<DeliverAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
