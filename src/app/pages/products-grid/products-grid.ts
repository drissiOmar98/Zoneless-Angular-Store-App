import {Component, effect, inject, input, signal} from '@angular/core';

import {ProductCard} from '../../shared/components/product-card/product-card';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemTitle, MatNavList} from '@angular/material/list';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {EcommerceStore} from '../../core/store/ecommerce-store';

import {ToggleWishlistButton} from '../../shared/components/toggle-wishlist-button/toggle-wishlist-button';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

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
  route = inject(ActivatedRoute);

  //category = input<string>('all');

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
    //this.store.setCategory(this.category);
    //this.store.setProductsListSeoTags(this.category)


    const urlSearchQuery = toSignal(
      this.route.queryParamMap.pipe(
        map(params => params.get('search') || ''),
      ));


    effect(() => {
      const query = urlSearchQuery();
      if (query !== undefined) {
        this.store.setSearchQuery(query);
      }
    })
  }



}
