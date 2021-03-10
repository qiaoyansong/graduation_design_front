import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgComponent } from './tg.component';

describe('TgComponent', () => {
  let component: TgComponent;
  let fixture: ComponentFixture<TgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
