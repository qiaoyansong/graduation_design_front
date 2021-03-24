import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeekHelpDetailComponent } from './user-seek-help-detail.component';

describe('UserSeekHelpDetailComponent', () => {
  let component: UserSeekHelpDetailComponent;
  let fixture: ComponentFixture<UserSeekHelpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSeekHelpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSeekHelpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
