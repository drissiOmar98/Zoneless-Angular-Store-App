import {Component, inject} from '@angular/core';
import {BackButton} from '../../shared/components/back-button/back-button';
import {ListCartItems} from './list-cart-items/list-cart-items';
import {TeaseWishlist} from './tease-wishlist/tease-wishlist';
import {SummarizeOrder} from '../../shared/components/summarize-order/summarize-order';
import {MatButton} from '@angular/material/button';
import {EcommerceStore} from '../../core/store/ecommerce-store';

@Component({
  selector: 'app-view-cart',
  imports: [
    BackButton,
    ListCartItems,
    TeaseWishlist,
    SummarizeOrder,
    MatButton
  ],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export class ViewCart {

  store = inject(EcommerceStore);

}
