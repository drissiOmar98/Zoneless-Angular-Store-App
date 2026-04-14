import {Component, inject, input} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {EcommerceStore} from '../../../core/store/ecommerce-store';

@Component({
  selector: 'app-back-button',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {

  navigateTo = input<string[]>();
  clearSearch = input<boolean>(true);
  store = inject(EcommerceStore);
  router = inject(Router);

  goBack() {
    if (this.clearSearch()) {
      this.store.setSearchQuery('');
      this.store.setCategory('all');
      this.router.navigate(this.navigateTo() ?? [], {
        queryParams: {search: null},
        queryParamsHandling: 'merge'
      });
    } else {
      const currentQuery = this.store.searchQuery();
      this.router.navigate(this.navigateTo() ?? [], {
        queryParams: currentQuery ? {search: currentQuery} : {},
        queryParamsHandling: 'merge'
      });
    }
  }


}
