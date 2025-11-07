import {Component, computed, inject, input, signal} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductCard} from '../../shared/components/product-card/product-card';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemTitle, MatNavList} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {EcommerceStore} from '../../core/store/ecommerce-store';

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
