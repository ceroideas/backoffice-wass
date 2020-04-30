import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlogComponent } from './create.component';

describe('CreateBlogComponent', () => {
  let component: CreateBlogComponent;
  let fixture: ComponentFixture<CreateBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.CreateBlogComponent(CreateBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
