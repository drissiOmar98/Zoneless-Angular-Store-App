import {Component, inject, input, output} from '@angular/core';
import {Product} from '../../models/product';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FavoritesStore} from '../../../core/store/favorites.store';

@Component({
  selector: 'app-product-card',
  imports: [
    MatIcon,
    MatButton,
    MatIconButton
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

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
