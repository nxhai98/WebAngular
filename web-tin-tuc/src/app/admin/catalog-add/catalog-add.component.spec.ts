import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogAddComponent } from './catalog-add.component';

describe('CatalogAddComponent', () => {
  let component: CatalogAddComponent;
  let fixture: ComponentFixture<CatalogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
