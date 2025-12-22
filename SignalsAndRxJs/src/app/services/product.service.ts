import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { Maybe } from '../../ts-utilis/maybe.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  selectedProductChanged = new BehaviorSubject<Maybe<Product>>(null);
  productQuery = new BehaviorSubject<string>('');
  orderedProducts: Product[] = [];
  productOrderChanged = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts$(): Observable<Product[]> {
    const products$ = this.http.get<Product[]>(this.apiUrl);
    return combineLatest([products$, this.productQuery.asObservable()]).pipe(
      map(([products, query]) => {
        return products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }

  getProductById$(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  onSearchUpdated(query: string): void {
    this.productQuery.next(query);
  }

  selectProduct(product: Maybe<Product>): void {
    this.selectedProductChanged.next(product);
  }

  addToCart(product: Product): void {
    this.productOrderChanged.next([...this.orderedProducts, product]);
  }
}
