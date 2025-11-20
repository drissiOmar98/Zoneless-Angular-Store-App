import {Product} from '../../shared/models/product';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {Toaster} from '../../shared/services/toaster';
import {computed, inject} from '@angular/core';
import {withStorageSync} from '@angular-architects/ngrx-toolkit';

export interface FavoritesState {
  favoriteItems: Product[];
}

const initialFavoritesState: FavoritesState = {
  favoriteItems: [],
};


export const FavoritesStore = signalStore(
  {providedIn: 'root'},
  withState(initialFavoritesState),
  withStorageSync({ key: 'Favorites Store' }),
  withComputed((store) => ({
    count: computed(() => store.favoriteItems().length),
    isFavorite: computed(() => {
      return (productId: string) => store.favoriteItems().some(item => item.id === productId);
    })
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
    addToFavorites(product: Product) {
      const exists = store.favoriteItems().some(item => item.id === product.id);
      if (!exists) {
        patchState(store, {favoriteItems: [...store.favoriteItems(), product]});
        toaster.success(`Product added to wishlist`);
      }
    },
    removeFromFavorites(id: string) {
      patchState(store, {
        favoriteItems: store.favoriteItems().filter(item => item.id !== id)
      });
      toaster.success('Product removed from wishlist');
    },
    clearFavorites() {
      patchState(store, {favoriteItems: []});
    },

  })),
  withHooks({
    onInit(store) {
      console.log('FavoritesStore initialized');
    },
    onDestroy(store) {
      console.log('FavoritesStore destroyed');
    }
  })
);
