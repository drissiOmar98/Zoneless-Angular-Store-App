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
import {MatDialog} from '@angular/material/dialog';
import {SignUpDialog} from '../../shared/components/sign-up-dialog/sign-up-dialog';
import {SignInDialog} from '../../shared/components/sign-in-dialog/sign-in-dialog';


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
  matDialog = inject(MatDialog);

  openSignInDialog() {
    this.matDialog.open(SignInDialog, {
      disableClose: true,
    });
  }

  openSignUpDialog() {
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
    });
  }
}
