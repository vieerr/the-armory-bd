// checkout.component.ts
import { Component, inject, signal } from '@angular/core';
import { cartService } from '@app/shopping-cart/services/cart-service';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { boxCoinStack, boxCheck } from '@ng-icons/boxicons/regular';

import { gameTiedScroll, gameWaxSeal, gameQuill } from '@ng-icons/game-icons';
import { CurrencyPipe } from '@angular/common';
import { User } from '@app/shared/interfaces/User';
import { AuthService } from '@app/auth/services/auth-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgIcon, CurrencyPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
  providers: [
    provideIcons({
      boxCoinStack,
      boxCheck,
      gameTiedScroll,
      gameWaxSeal,
      gameQuill,
    }),
  ],
})
export class Checkout {
  shippingCost: number = 15.0;

  private authService = inject(AuthService);

  products = cartService.getCartItems();

  subtotal = cartService.getTotal();

  user = signal<User | null>(null);

  constructor(private router: Router) {
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      this.user.set(user);
    });
  }

  completeOrder() {
    const formFields = {
      // "id" will be assigned by backend, so omit here
      clientId: this.user()?.id,
      productIds: this.products.map((item) => item.id),
      shippingAddress: (document.getElementById('address') as HTMLInputElement)?.value,
      paymentMethod: (document.getElementById('paymentMethod') as HTMLInputElement)?.value,
      total: this.subtotal + this.shippingCost,
      status: 'PENDING',
      createdAt: new Date().getTime(),
    };

    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Order submission failed');
        }
        return response.json();
      })
      .then((response) => {
        // Optionally clear cart and navigate to confirmation
        // cartService.clearCart();
        this.router.navigate(['/checkout/confirmation/', response.id]);
        // this.router.navigate([this.router.url, '/confirmation']);
      })
      .catch((error) => {
        console.error(error);
        // Optionally show error to user
      });
  }

  // placeOrder() {
  //   // Process order logic here
  //   // this.cartService.clearCart();
  //   this.router.navigate(['/order-confirmation']);
  // }
}
