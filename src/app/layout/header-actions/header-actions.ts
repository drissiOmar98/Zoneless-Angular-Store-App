import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {FavoritesStore} from '../../core/store/favorites.store';
import {MatBadge} from '@angular/material/badge';
import {CartStore} from '../../core/store/cart.store';
import {EcommerceStore} from '../../core/store/ecommerce-store';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';


@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatBadge,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider
  ],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.scss',
})
export class HeaderActions {

  favoriteStore = inject(FavoritesStore);
  cartStore = inject(CartStore);
  store = inject(EcommerceStore);

}
