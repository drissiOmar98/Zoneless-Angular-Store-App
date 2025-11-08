import {Component, inject, input, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from "@angular/material/button";
import {FavoritesStore} from '../../../core/store/favorites.store';
import {Product} from '../../models/product';

@Component({
  selector: 'app-toggle-wishlist-button',
    imports: [
        MatIcon,
        MatIconButton
    ],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {

  favoriteStore = inject(FavoritesStore);
  product = input.required<Product>();

  toggleWishList(product: Product) {
    if (this.favoriteStore.isFavorite()(product.id)) {
      this.favoriteStore.removeFromFavorites(product.id);
    } else {
      this.favoriteStore.addToFavorites(product);
    }
  }

}
