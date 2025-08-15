import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface as Product } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '/api/products';

  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Sword of Destiny',
      description: 'A legendary sword with magical properties.',
      price: 100,
      rating: 4,
      imageUrl:
        'https://res.cloudinary.com/da6oky1vo/image/upload/v1754586082/sword_a4fgtt.jpg',
      details: [
        'Forged in the fires of Mount Doom',
        'Increases attack power by 20%',
        'Grants the wielder enhanced agility',
      ],
    },
    {
      id: 2,
      name: 'Shield of Valor',
      description: 'A sturdy shield that can withstand any attack.',
      price: 75,
      rating: 4,
      imageUrl:
        'https://res.cloudinary.com/da6oky1vo/image/upload/v1754586083/shield_c0foay.jpg',
      details: [
        'Made from the strongest steel',
        'Reduces damage taken by 15%',
        'Enhances defense against magical attacks',
      ],
    },
    {
      id: 3,
      name: 'Helmet of Wisdom',
      description: 'A helmet that grants the wearer enhanced intelligence.',
      price: 50,
      rating: 4.5,
      imageUrl:
        'https://res.cloudinary.com/da6oky1vo/image/upload/v1754586082/helmet_tmimez.jpg',
      details: [
        'Crafted by the ancient sages',
        'Increases intelligence by 10 points',
        'Allows the wearer to understand ancient languages',
      ],
    },
    {
      id: 4,
      name: 'Boots of Swiftness',
      description: "Lightweight boots that increase the wearer's speed.",
      price: 40,
      rating: 4.2,
      imageUrl:
        'https://res.cloudinary.com/da6oky1vo/image/upload/v1754586093/juanita-burbano_djfyri.jpg',
      details: [
        'Made from enchanted leather',
        'Increases movement speed by 15%',
        'Reduces fall damage by 50%',
      ],
    },
    {
      id: 5,
      name: 'Axe of Fury',
      description: 'A heavy axe that deals devastating blows.',
      price: 90,
      rating: 4.3,
      imageUrl:
        'https://res.cloudinary.com/da6oky1vo/image/upload/v1754586082/sword_a4fgtt.jpg',
      details: [
        'Double-edged blade for maximum damage',
        'Increases critical hit chance by 10%',
        'Forged by master blacksmiths',
      ],
    },
    {
      id: 6,
      name: 'Armor of Fortitude',
      description: 'Impenetrable armor that protects against all harm.',
      price: 120,
      rating: 4.7,
      imageUrl:
        'https://res.cloudinary.com/da6oky1vo/image/upload/v1754586083/shield_c0foay.jpg',
      details: [
        'Reinforced with magical runes',
        'Reduces all incoming damage by 25%',
        'Grants resistance to elemental attacks',
      ],
    },
    {
      id: 7,
      name: 'Ring of Invisibility',
      description: 'A mystical ring that renders the wearer unseen.',
      price: 200,
      rating: 4.8,
      imageUrl:
        'https://res.cloudinary.com/da6oky1vo/image/upload/v1754586082/helmet_tmimez.jpg',
      details: [
        'Allows the wearer to become invisible at will',
        'Lasts for up to 10 minutes per use',
        'Cannot be detected by magical means',
      ],
    },
    {
      id: 8,
      name: 'Gloves of Strength',
      description: 'Gloves that greatly enhance physical power.',
      price: 60,
      rating: 4.1,
      imageUrl:
        'https://res.cloudinary.com/da6oky1vo/image/upload/v1754586093/juanita-burbano_djfyri.jpg',
      details: [
        'Increases grip and lifting capacity',
        'Boosts melee damage by 15%',
        'Made from dragon hide',
      ],
    },
  ];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.apiUrl);
    // For mock data, return the mockProducts array as an observable
    return new Observable((observer) => {
      observer.next(this.mockProducts);
      observer.complete();
    });
  }

  getProduct(id: string): Observable<Product> {
    // return this.http.get<Product>(`${this.apiUrl}/${id}`);
    // For mock data, find the product by id in the mockProducts array
    return new Observable((observer) => {
      const product = this.mockProducts.find((p) => p.id === +id);
      if (product) {
        observer.next(product);
      } else {
        observer.error('Product not found');
      }
      observer.complete();
    });
  }

  createProduct(product: Product): Observable<Product> {
    return new Observable((observer) => {
      const newProduct = { ...product, id: this.mockProducts.length + 1 };
      this.mockProducts.push(newProduct);
      observer.next(newProduct);
      observer.complete();
    });
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return new Observable((observer) => {
      const index = this.mockProducts.findIndex((p) => p.id === +id);
      if (index !== -1) {
        this.mockProducts[index] = { ...product, id: +id };
        observer.next(this.mockProducts[index]);
      } else {
        observer.error('Product not found');
      }
      observer.complete();
    });
  }

  deleteProduct(id: string): Observable<void> {
    return new Observable((observer) => {
      const index = this.mockProducts.findIndex((p) => p.id === +id);
      if (index !== -1) {
        this.mockProducts.splice(index, 1);
        observer.next();
      } else {
        observer.error('Product not found');
      }
      observer.complete();
    });
  }
}
