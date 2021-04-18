import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverAuctionAdminComponent } from './deliver-auction-admin.component';

describe('DeliverAuctionAdminComponent', () => {
  let component: DeliverAuctionAdminComponent;
  let fixture: ComponentFixture<DeliverAuctionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverAuctionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverAuctionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
