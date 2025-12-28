import {Component, inject} from '@angular/core';
import {BackButton} from '../../shared/components/back-button/back-button';
import {FavoritesStore} from '../../core/store/favorites.store';
import {ProductCard} from '../../shared/components/product-card/product-card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {EmptyWishlist} from './empty-wishlist/empty-wishlist';
import {SeoManager} from '../../shared/services/seo-manager';

@Component({
  selector: 'app-my-wishlist',
  imports: [
    BackButton,
    ProductCard,
    MatIcon,
    MatIconButton,
    MatButton,
    EmptyWishlist
  ],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export class MyWishlist {

  favoriteStore = inject(FavoritesStore);

  protected seoManager = inject(SeoManager);

  constructor() {
    this.seoManager.updateSeoTags({
      title: 'My Wishlist',
      description: 'View your wishlist items'
    })
  }

}
