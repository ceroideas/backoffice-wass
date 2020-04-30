import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersComponent } from './create.component';

describe('CreateUsersComponent', () => {
  let component: CreateUsersComponent;
  let fixture: ComponentFixture<CreateUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.CreateUsersComponent(CreateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
