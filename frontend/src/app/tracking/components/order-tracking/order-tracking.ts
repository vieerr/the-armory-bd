import { AgmCoreModule } from '@agm/core';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '@app/shared/components/map/map';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { gameCheckMark, gameCircle, gameHourglass, gameInfo, gameOwl, gamePhone, gamePlayerBase, gameScrollQuill, gameTreasureMap } from '@ng-icons/game-icons';

@Component({
  selector: 'app-order-tracking',
  imports: [NgIcon, DatePipe, CurrencyPipe, MapComponent],
  templateUrl: './order-tracking.html',
  styles: ``,
  providers: [
    provideIcons({
      gameScrollQuill,
      gameTreasureMap,
      gameHourglass,
      gameCheckMark,
      gameCircle,
      gameInfo,
      gamePlayerBase,
      gameOwl,
      gamePhone
    }),
  ],
})
export class OrderTracking {
  user = {
    name: 'John Doe',
    email: 'test@example.com',
    phone: '123-456-7890',
  };
  order = {
    id: 1,
    trackingStatuses: [
      { description: 'Order Placed', date: '2023-10-01' },
      { description: 'Processing', date: '2023-10-02' },
      { description: 'Shipped', date: '2023-10-03' },
      { description: 'In Transit', date: '2023-10-04' },
      { description: 'Delivered', date: '2023-10-05' },
    ],
    currentStatus: 'In Transit',
    items: [
      { name: 'Enchanted Ear-Guards', quantity: 1, price: 50 },
      { name: 'Chronometer Amulet', quantity: 1, price: 75 },
    ],
    totalPrice: 125,
  };
}
