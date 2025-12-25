import { Component, signal } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterModule, MatTabsModule, CommonModule, MatIcon],
})
export class AppComponent {

  navLinks = [
    { label: 'Welcome', path: '', icon: 'home' },
    { label: 'Product List', path: '/products', icon: 'list' },
    {
      label: 'Cart',
      path: '/cart',
      icon: 'shopping_cart',
    },
  ];
  activeLink = this.navLinks[0].path;
}

