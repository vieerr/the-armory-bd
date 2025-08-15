import { ProductInterface } from "../../products/interfaces/product-interface";

export interface CartItem extends ProductInterface {
  quantity: number;
}