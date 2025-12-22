import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductComponent } from '../components/product/product.component';
import { CartComponent } from '../components/cart/cart.component';

export const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
