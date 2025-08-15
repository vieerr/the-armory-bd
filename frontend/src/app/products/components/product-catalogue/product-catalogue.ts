import { Component, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { ProductInterface } from '../../interfaces/product-interface';
import { AuthService } from '@app/auth/services/auth-service';

@Component({
  selector: 'app-product-catalogue',
  imports: [ProductCard, CommonModule],
  templateUrl: './product-catalogue.html',
  styleUrl: './product-catalogue.css',
})
export class ProductCatalogue {
  products: ProductInterface[] = [];
  private productService = inject(ProductService);

  private authService = inject(AuthService);

  user = this.authService.getCurrentUser().subscribe((user) => {
    console.log('User Data:', user);
    return user;
  });

  constructor() {
    // console.log('User Data:', this.user);
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
