import { Routes } from '@angular/router';
import { ProductDetails } from './products/components/product-details/product-details';
import { ProductLayout } from './products/components/product-layout/product-layout';
import { ShoppingCart } from './shopping-cart/components/shopping-cart/shopping-cart';
import { Checkout } from './billing/components/order-details/checkout';
import { OrderConfirmationComponent } from './billing/components/confirmation/confirmation';
import { OrdersLayout } from './orders/components/orders-layout/orders-layout';
import { OrderTracking } from './tracking/components/order-tracking/order-tracking';
export const routes: Routes = [
  { path: 'orders', component: OrdersLayout },
  { path: 'orders/tracking/:id', component: OrderTracking },
  { path: 'cart', component: ShoppingCart },
  { path: 'checkout/confirmation', component: OrderConfirmationComponent },
  { path: 'checkout', component: Checkout },
  { path: 'products/:id', component: ProductDetails },
  { path: '', component: ProductLayout },
];
