import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterModule, MatTabsModule, CommonModule],
})
export class AppComponent {
  protected readonly title = signal('SignalsAndRxJs');

  navLinks = [
    { label: 'Welcome', path: '' },
    { label: 'Product List', path: '/products' },
    {
      label: 'Cart',
      path: '/cart',
    },
  ];
  activeLink = this.navLinks[0].path;
}
