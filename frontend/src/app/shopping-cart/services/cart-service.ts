import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../interfaces/CartItem';
import { ProductInterface } from '@app/products/interfaces/product-interface';
@Injectable({
  providedIn: 'root',
})
class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  addToCart(item: Omit<CartItem, 'quantity'>, quantity: number): void {
    const existingItem = this.cartItems.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ ...item, quantity });
    }

    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(itemId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  getProductQuantity(itemId: number): number {
    const item = this.cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems]; 
  }
}

export const cartService = new CartService();
