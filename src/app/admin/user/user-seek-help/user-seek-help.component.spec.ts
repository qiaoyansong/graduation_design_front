import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeekHelpComponent } from './user-seek-help.component';

describe('UserSeekHelpComponent', () => {
  let component: UserSeekHelpComponent;
  let fixture: ComponentFixture<UserSeekHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSeekHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSeekHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
