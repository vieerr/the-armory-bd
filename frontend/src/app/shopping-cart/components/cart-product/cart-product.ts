import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../interfaces/CartItem';
import { cartService } from '../../services/cart-service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-product.html',
  styleUrl: './cart-product.css',
})
export class CartProduct {

  @Input() product!: CartItem;
  @Output() productRemoved = new EventEmitter<number>();
  @Output() quantityChanged = new EventEmitter<{ id: number, quantity: number }>(); // New event emitter
  quantity: number = 0;

  ngOnInit() {
    this.quantity = cartService.getProductQuantity(this.product.id);
  }

  decrementQuantity(): void {
    if (this.quantity > 1) { // Changed from 0 to 1 to prevent zero quantity
      this.quantity--;
      cartService.updateQuantity(this.product.id, this.quantity);
      this.quantityChanged.emit({ id: this.product.id, quantity: this.quantity }); // Emit the change
    }
  }

  incrementQuantity(): void {
    this.quantity++;
    cartService.updateQuantity(this.product.id, this.quantity);
    this.quantityChanged.emit({ id: this.product.id, quantity: this.quantity }); // Emit the change
  }

  removeProduct(): void {
    cartService.removeFromCart(this.product.id);
    this.productRemoved.emit(this.product.id);
  }
}