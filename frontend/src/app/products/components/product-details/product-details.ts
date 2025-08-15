import { Component, inject, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@app/products/services/product-service';
import { ProductInterface } from '@app/products/interfaces/product-interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { boxCoinSolid} from '@ng-icons/boxicons/solid';
import { boxCheck, boxMinus, boxPlus} from '@ng-icons/boxicons/regular';
import { cartService } from '@app/shopping-cart/services/cart-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgIcon,CurrencyPipe ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  viewProviders: [provideIcons({ heroUsers, boxCoinSolid, boxMinus, boxPlus, boxCheck })],
})
export class ProductDetails {
  private productService = inject(ProductService);

  quantity = 1;

  product!: ProductInterface;

  addToCart(product: ProductInterface, quantity: number): void {
    cartService.addToCart(product, quantity);
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productService.getProduct(id).subscribe((product) => {
        this.product = product;
      });
    });
  }
}
