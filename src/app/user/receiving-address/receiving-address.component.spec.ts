import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingAddressComponent } from './receiving-address.component';

describe('ReceivingAddressComponent', () => {
  let component: ReceivingAddressComponent;
  let fixture: ComponentFixture<ReceivingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
