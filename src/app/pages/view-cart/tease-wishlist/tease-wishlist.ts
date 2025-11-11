import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {ViewPanel} from '../../../shared/directives/view-panel';
import {FavoritesStore} from '../../../core/store/favorites.store';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {CartStore} from '../../../core/store/cart.store';

@Component({
  selector: 'app-tease-wishlist',
  imports: [
    MatIcon,
    ViewPanel,
    MatButton,
    RouterLink
  ],
  templateUrl: './tease-wishlist.html',
  styleUrl: './tease-wishlist.scss',
})
export class TeaseWishlist {

  favoriteStore = inject(FavoritesStore);
  cartStore = inject(CartStore);


}
