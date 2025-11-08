import {Component, inject, input, signal} from '@angular/core';

import {ProductCard} from '../../shared/components/product-card/product-card';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemTitle, MatNavList} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {EcommerceStore} from '../../core/store/ecommerce-store';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {ToggleWishlistButton} from '../../shared/components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButton,
  ],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {

  store = inject(EcommerceStore);

  category = input<string>('all');

  categories = signal<string[]>([
    'all',
    'electronics',
    'photography',
    'clothing',
    'gaming',
    'luxury',
    'sneakers',
    'sunglasses',
    'furniture',
    'kitchen'
  ]);

  constructor() {
    this.store.setCategory(this.category);
  }


}
