import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

interface Order {
  id: number;
  clientId: number;
  productIds: number[];
  shippingAddress: string;
  paymentMethod: string;
  total: number;
  status: string;
  createdAt: number;
}

@Component({
  imports: [ NgIcon, CurrencyPipe],
  selector: 'app-order-confirmation',
  templateUrl: './confirmation.html',
  styles: [``],
})
export class OrderConfirmationComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private datePipe = inject(DatePipe);

  // Reactive state
  order = signal<Order | null>(null);
  loading = signal(true);

  // Computed properties
  orderDate = computed(
    () =>
      this.datePipe.transform(
        this.order()?.createdAt ? new Date(this.order()!.createdAt) : null,
        'mediumDate'
      ) || 'N/A'
  );

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchOrder(id);
      }
    });
  }

  private fetchOrder(orderId: string): void {
    this.loading.set(true);
    this.http
      .get<Order>(`http://localhost:8080/api/order/${orderId}`)
      .subscribe({
        next: (order) => {
          this.order.set(order);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Failed to fetch order:', err);
          this.loading.set(false);
        },
      });
  }
}
