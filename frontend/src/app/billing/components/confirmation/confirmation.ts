import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { cartService } from '@app/shopping-cart/services/cart-service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  gameBlackKnightHelm,
  gameTreasureMap,
  gamePointySword,
  gameScrollUnfurled,
  gameDeliveryDrone,
  gameOpenTreasureChest,
  gameRoyalLove,
  gameWaxSeal
} from '@ng-icons/game-icons';

@Component({
  selector: 'app-order-confirmation',
  imports: [NgIconComponent, CurrencyPipe, DatePipe],
  templateUrl: './confirmation.html',
  styles: [``],
  providers: [
    provideIcons({
      gameBlackKnightHelm,
      gameTreasureMap,
      gamePointySword,
      gameScrollUnfurled,
      gameDeliveryDrone,
      gameOpenTreasureChest,
      gameRoyalLove,
      gameWaxSeal
    }),
  ],
})
export class OrderConfirmationComponent {
  orderId = 'KN' + Math.floor(Math.random() * 1000000);
  orderDate = new Date();
  expectedDeliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  shippingMethod = 'Royal Gryphon Express';

  orderTotal = cartService.getTotal() + 15.0; // 15.00 shipping
  cartItems = cartService.getCartItems();

  // Example data - should come from checkout form
  shippingAddress = {
    fullName: 'Sir Lancelot du Lac',
    street1: '123 Round Table Rd',
    street2: 'Dungeon Level 3',
    city: 'Camelot',
    realm: 'Albion',
    scrollCode: 'EXC4L1BUR',
    kingdom: 'Kingdom of Britannia',
  };

  paymentMethod = {
    lastFour: '4999',
    expiry: '12/24',
  };

  // cartItems = [
  //   { name: 'Excalibur Status', price: 79, quantity: 1 },
  //   { name: 'Chronometer Année', price: 129, quantity: 1 },
  //   { name: 'Battle Pendant Line', price: 49.99, quantity: 1 },
  // ];
}
