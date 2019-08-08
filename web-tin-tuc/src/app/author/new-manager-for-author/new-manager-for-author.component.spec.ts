import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewManagerForAuthorComponent } from './new-manager-for-author.component';

describe('NewManagerForAuthorComponent', () => {
  let component: NewManagerForAuthorComponent;
  let fixture: ComponentFixture<NewManagerForAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewManagerForAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewManagerForAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
