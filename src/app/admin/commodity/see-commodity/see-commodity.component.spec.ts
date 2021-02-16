import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeCommodityComponent } from './see-commodity.component';

describe('SeeCommodityComponent', () => {
  let component: SeeCommodityComponent;
  let fixture: ComponentFixture<SeeCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
