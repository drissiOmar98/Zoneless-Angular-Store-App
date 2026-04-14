import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {HeaderActions} from '../header-actions/header-actions';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {EcommerceStore} from '../../core/store/ecommerce-store';
import {SearchBar} from '../search-bar/search-bar';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    HeaderActions,
    RouterLink,
    MatIcon,
    MatIconButton,
    SearchBar
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  store = inject(EcommerceStore);

  toggleSidenav() {
    this.store.toggleSidenav();
  }

}
