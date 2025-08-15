import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogue } from './product-catalogue';

describe('ProductCatalogue', () => {
  let component: ProductCatalogue;
  let fixture: ComponentFixture<ProductCatalogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCatalogue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCatalogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
