import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionProcessComponent } from './auction-process.component';

describe('AuctionProcessComponent', () => {
  let component: AuctionProcessComponent;
  let fixture: ComponentFixture<AuctionProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
