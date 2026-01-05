import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { Product } from '../models/product';
import { Maybe } from '../../ts-utilis/maybe.type';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  allProducts = signal<Product[]>([]);
  selectedProduct = signal<Maybe<Product>>(null);
  searchPattern = signal<string>('');

  constructor(private http: HttpClient) {}

  getProducts(): Signal<Product[]> {
    const products$ = this.http.get<Product[]>(this.apiUrl);
    const filteredProducts$ = combineLatest([products$, toObservable(this.searchPattern)]).pipe(
      map(([products, query]) => {
        this.allProducts.set(products);
        return products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
    return toSignal(filteredProducts$, { initialValue: [] });
  }

  onSearchUpdated(query: string): void {
    this.searchPattern.set(query);
  }

  selectProduct(product: Maybe<Product>): void {
    this.selectedProduct.set(product);
  }
}
