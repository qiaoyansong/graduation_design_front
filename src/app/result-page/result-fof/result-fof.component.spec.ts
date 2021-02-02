import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultFofComponent} from './result-fof.component';

describe('ResultFofComponent', () => {
  let component: ResultFofComponent;
  let fixture: ComponentFixture<ResultFofComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultFofComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
