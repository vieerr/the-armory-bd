import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { gameAbstract014, gameCancel, gameReceiveMoney } from '@ng-icons/game-icons';

@Component({
  selector: 'app-cancelled-orders',
  imports: [NgIcon],
  templateUrl: './cancelled-orders.html',
  styles: ``,
  providers: [
    provideIcons({
      gameAbstract014,
      gameReceiveMoney,
      gameCancel
    }),
  ],

})
export class CancelledOrders {

}
