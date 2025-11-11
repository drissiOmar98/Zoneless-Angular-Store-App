import {CartItem} from '../../shared/models/cart-item';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {Product} from '../../shared/models/product';
import {Toaster} from '../../shared/services/toaster';
import {produce} from 'immer';


export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

export const CartStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed((store) => ({
    isCartEmpty: computed(() => store.items().length === 0),
    allItemsCount: computed(()=> store.items().reduce((acc , item) => acc + item.quantity,0)),
    uniqueItemsCount: computed(() => store.items().length),
    isInCart: computed(() => {
      return (productId: string) => store.items().some(item => item.id === productId);
    })
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
    addToCart: (product: Product, quantity = 1) => {
      const existingItemIndex = store.items().findIndex(item => item.id === product.id);
      const updatedCartItems = produce(store.items(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }
        draft.push({...product, quantity})
      });
      patchState(store, {items: updatedCartItems});
      toaster.success(
        existingItemIndex !== -1
          ? `Increased quantity for the product`
          : `Product added to the cart`
      );
    },
    setItemQuantity(params: { productId: string, quantity: number}) {
      const index = store.items().findIndex(c => c.id === params.productId);
      const updated = produce(store.items(), (draft) => {
        draft[index].quantity = params.quantity
      });
      patchState(store, {items : updated});
    },
    resetCart() {
      patchState(store, {
        items: []
      });
      toaster.success('Cart cleared successfully');
    }
  })),
  withHooks((store) => ({
    onInit: () => {
      console.log('🛒 CartStore initialized, loading cart...');

    },
    onDestroy: () => {
      console.log('CartStore destroyed.');
    },
  }))
)
