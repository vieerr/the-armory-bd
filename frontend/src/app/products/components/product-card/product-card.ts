import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { cartService } from '../../../shopping-cart/services/cart-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  constructor(private router: Router) {}
  @Input() product!: ProductInterface;
  addToCart(product: ProductInterface, quantity: number): void {
    cartService.addToCart(product, quantity);
  }
}
