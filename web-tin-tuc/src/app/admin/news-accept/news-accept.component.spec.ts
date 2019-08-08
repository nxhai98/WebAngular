import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAcceptComponent } from './news-accept.component';

describe('NewsAcceptComponent', () => {
  let component: NewsAcceptComponent;
  let fixture: ComponentFixture<NewsAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
