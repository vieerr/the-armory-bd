import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLayout } from './product-layout';

describe('ProductLayout', () => {
  let component: ProductLayout;
  let fixture: ComponentFixture<ProductLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
