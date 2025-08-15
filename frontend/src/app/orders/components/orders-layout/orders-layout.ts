import { Component } from '@angular/core';
import { Orders } from "../orders/orders";
import { CancelledOrders } from "../cancelled-orders/cancelled-orders";

@Component({
  selector: 'app-orders-layout',
  imports: [Orders, CancelledOrders],
  templateUrl: './orders-layout.html',
  styles: ``
})
export class OrdersLayout {

}
