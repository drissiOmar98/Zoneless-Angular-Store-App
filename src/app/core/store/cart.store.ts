import {CartItem} from '../../shared/models/cart-item';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {Product} from '../../shared/models/product';
import {Toaster} from '../../shared/services/toaster';


export interface CartState {
  items: CartItem[];
  totalQuantities: number;
  totalAmount: number;
}


const initialState: CartState = {
  items: [],
  totalQuantities: 0,
  totalAmount: 0
};

export const CartStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed((store) => ({
    isCartEmpty: computed(() => store.items().length === 0),
    uniqueItemsCount: computed(() => store.items().length),
    isInCart: computed(() => {
      return (productId: string) => store.items().some(item => item.id === productId);
    })
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
    addItem(product: Product) {
      const items = store.items();
      const existingItem = items.find(item => item.id === product.id);

      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = items.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );

        patchState(store, {
          items: updatedItems,
          totalQuantities: store.totalQuantities() + 1,
          totalAmount: store.totalAmount() + product.price
        });

        toaster.success(`Increased quantity for the Product`);
      }
      else {
        updatedItems = [...items, {...product, quantity: 1}];

        patchState(store, {
          items: updatedItems,
          totalQuantities: store.totalQuantities() + 1,
          totalAmount: store.totalAmount() + product.price
        });

        toaster.success(`Product added to the Cart`);
      }
    },
    removeItem(id: string) {
      const items = store.items();
      const existingItem = items.find(item => item.id === id);
      if (!existingItem) return;

      const updatedItems =
        existingItem.quantity > 1
          ? items.map(item =>
            item.id === id
              ? {...item, quantity: item.quantity - 1}
              : item
          )
          : items.filter(item => item.id !== id);

      patchState(store, {
        items: updatedItems,
        totalQuantities: store.totalQuantities() - 1,
        totalAmount: store.totalAmount() - existingItem.price,
      });

      toaster.success(
        existingItem.quantity > 1
          ? `Decreased quantity for this Product`
          : `Product removed from cart`
      );
    },
    remove(id: string) {
      const existingItem = store.items().find(item => item.id === id);
      if (!existingItem) return;

      patchState(store, {
        items: store.items().filter(item => item.id !== id),
        totalQuantities: store.totalQuantities() - existingItem.quantity,
        totalAmount: store.totalAmount() - (existingItem.quantity * existingItem.price)
      });

      toaster.success(`Product completely removed from cart`);
    },
    resetCart() {
      patchState(store, {
        items: [],
        totalQuantities: 0,
        totalAmount: 0
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
