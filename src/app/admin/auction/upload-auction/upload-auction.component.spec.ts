import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAuctionComponent } from './upload-auction.component';

describe('UploadAuctionComponent', () => {
  let component: UploadAuctionComponent;
  let fixture: ComponentFixture<UploadAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
