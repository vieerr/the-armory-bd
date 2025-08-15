import { Component, inject, signal } from '@angular/core';
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
import { CommonModule, CurrencyPipe } from '@angular/common';
import { User } from '@app/shared/interfaces/User';
import { AuthService } from '@app/auth/services/auth-service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIcon, CurrencyPipe, CommonModule],
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

  private authService = inject(AuthService);

  user = signal<User | null>(null);
  constructor() {
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      console.log('User Data:', user);
      this.user.set(user);
    });
    cartService.cart$.subscribe((items) => {
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
      this.cartTotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    });
  }
}
