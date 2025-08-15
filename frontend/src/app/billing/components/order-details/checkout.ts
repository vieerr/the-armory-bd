// checkout.component.ts
import { Component } from '@angular/core';
import { cartService } from '@app/shopping-cart/services/cart-service';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { boxCoinStack, boxCheck } from '@ng-icons/boxicons/regular';

import { gameTiedScroll, gameWaxSeal, gameQuill } from '@ng-icons/game-icons';
import { CurrencyPipe } from '@angular/common';

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

  products = cartService.getCartItems();

  subtotal = cartService.getTotal();

  constructor(private router: Router) {}

  // placeOrder() {
  //   // Process order logic here
  //   // this.cartService.clearCart();
  //   this.router.navigate(['/order-confirmation']);
  // }
}
