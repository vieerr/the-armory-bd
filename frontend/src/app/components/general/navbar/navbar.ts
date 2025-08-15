import { Component } from '@angular/core';
import { cartService } from '../../../shopping-cart/services/cart-service';
import { RouterLink } from '@angular/router';
import {
  gameArchiveResearch,
  gameBackpack,
  gameBlackKnightHelm,
  gameBookCover,
  gameBookPile,
  gameBoxUnpacking,
  gameCrown,
  gameDragonHead,
  gameExitDoor,
  gameGears,
  gameHelmet,
  gameMagicPotion,
  gameOpenTreasureChest,
  gamePlayerBase,
  gameScrollQuill,
  gameScrollUnfurled,
  gameSwordBrandish,
  gameWizardStaff,
} from '@ng-icons/game-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIcon, CurrencyPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  providers: [
    provideIcons({
      gameBackpack,
      gameHelmet,
      gameWizardStaff,
      gameBookPile,
      gameMagicPotion,
      gameDragonHead,
      gameScrollUnfurled,
      gameScrollQuill,
      gameArchiveResearch,
      gameGears,
      gamePlayerBase,
      gameOpenTreasureChest,
      gameCrown,
      gameExitDoor,
      gameBoxUnpacking,
      gameSwordBrandish,
      gameBlackKnightHelm,
    }),
  ],
})
export class Navbar {
  cartCount = 0;
  cartTotal = 0;
  userName = 'Knight';

  constructor() {
    cartService.cart$.subscribe((items) => {
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
      this.cartTotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    });
  }
}
