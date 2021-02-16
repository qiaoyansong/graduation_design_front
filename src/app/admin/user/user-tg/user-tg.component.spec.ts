import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTgComponent } from './user-tg.component';

describe('UserTgComponent', () => {
  let component: UserTgComponent;
  let fixture: ComponentFixture<UserTgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
