import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepCommentComponent } from './rep-comment.component';

describe('RepCommentComponent', () => {
  let component: RepCommentComponent;
  let fixture: ComponentFixture<RepCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
