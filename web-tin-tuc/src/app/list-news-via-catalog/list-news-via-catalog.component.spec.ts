import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewsViaCatalogComponent } from './list-news-via-catalog.component';

describe('ListNewsViaCatalogComponent', () => {
  let component: ListNewsViaCatalogComponent;
  let fixture: ComponentFixture<ListNewsViaCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNewsViaCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewsViaCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
