import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAuctionComponent } from './see-auction.component';

describe('SeeAuctionComponent', () => {
  let component: SeeAuctionComponent;
  let fixture: ComponentFixture<SeeAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
