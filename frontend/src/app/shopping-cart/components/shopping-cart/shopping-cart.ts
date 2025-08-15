import { Component } from '@angular/core';

import { cartService } from '../../services/cart-service';
import { CartProduct } from '../cart-product/cart-product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-shopping-cart',
  imports: [CartProduct, CurrencyPipe, RouterLink],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  products = cartService.getCartItems();

  removeFromList(productId: number) {
    this.products = this.products.filter((p) => p.id !== productId);
  }

  get subtotal(): number {
    return this.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  }
  updateQuantity(event: { id: number; quantity: number }) {
    const product = this.products.find((p) => p.id === event.id);
    if (product) {
      product.quantity = event.quantity;
    }
  }
}
