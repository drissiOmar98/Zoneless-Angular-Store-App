import {Component, effect, inject, input, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatInput, MatPrefix} from '@angular/material/input';
import {Router} from '@angular/router';
import {EcommerceStore} from '../../core/store/ecommerce-store';

@Component({
  selector: 'app-search-bar',
  imports: [
    FormsModule,
    MatIcon,
    MatInput,
    MatPrefix
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  searchQuery = signal('');
  clearSearch = input<boolean>(true);
  store = inject(EcommerceStore);
  router = inject(Router);

  constructor() {
    effect(() => {
      this.searchQuery.set(this.store.searchQuery());
    });
  }

  onSearch(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const query = this.searchQuery().trim();
      this.store.setSearchQuery(query);
      this.router.navigate(['products'], {
        queryParams: {search: query}
      })
    }
  }

  cancelSearch() {
    this.searchQuery.set('');
    this.store.setSearchQuery('');
    this.router.navigate(['products'], {
      queryParams: {search: null}
    });
  }

}
