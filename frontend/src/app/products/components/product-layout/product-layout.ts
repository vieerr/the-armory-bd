import { Component } from '@angular/core';
import { ProductCatalogue } from "../product-catalogue/product-catalogue";

@Component({
  selector: 'app-product-layout',
  imports: [ProductCatalogue],
  templateUrl: './product-layout.html',
  styleUrl: './product-layout.css'
})
export class ProductLayout {

}
