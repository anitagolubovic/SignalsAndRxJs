import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { CartComponent } from '../components/cart/cart.component';
import { ProductComponent } from '../components/product/product.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([]),
    AppComponent,
    BrowserModule,
    MatTabsModule,
    CommonModule,
  ],
  exports: [RouterModule],
  bootstrap: [],
})
export class AppModule {}
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
