import {Component, inject} from '@angular/core';
import {BackButton} from '../../shared/components/back-button/back-button';
import {FavoritesStore} from '../../core/store/favorites.store';
import {ProductCard} from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-my-wishlist',
  imports: [
    BackButton,
    ProductCard
  ],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export class MyWishlist {

  favoriteStore = inject(FavoritesStore);

}
