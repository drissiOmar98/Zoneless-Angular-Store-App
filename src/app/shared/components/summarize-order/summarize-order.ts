import {Component, computed, inject} from '@angular/core';
import {ViewPanel} from '../../directives/view-panel';
import {CartStore} from '../../../core/store/cart.store';

@Component({
  selector: 'app-summarize-order',
  imports: [
    ViewPanel
  ],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {

  cartStore = inject(CartStore);

  subtotal = computed(() => Math.round(this.cartStore.items().reduce((acc, item) => acc + (item.price * item.quantity), 0)));

  tax = computed(() =>Math.round( 0.05 * this.subtotal()));

  total = computed(() => Math.round(this.subtotal() - this.tax() ));


}
