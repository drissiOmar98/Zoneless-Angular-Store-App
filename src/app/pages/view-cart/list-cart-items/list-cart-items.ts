import {Component, inject} from '@angular/core';
import {ViewPanel} from '../../../shared/directives/view-panel';
import {CartStore} from '../../../core/store/cart.store';
import {ShowCartItem} from '../../show-cart-item/show-cart-item';

@Component({
  selector: 'app-list-cart-items',
  imports: [
    ViewPanel,
    ShowCartItem
  ],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {
   cartStore = inject(CartStore);

}
