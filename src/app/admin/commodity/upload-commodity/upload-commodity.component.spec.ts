import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCommodityComponent } from './upload-commodity.component';

describe('UploadCommodityComponent', () => {
  let component: UploadCommodityComponent;
  let fixture: ComponentFixture<UploadCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
