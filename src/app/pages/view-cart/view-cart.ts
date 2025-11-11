import { Component } from '@angular/core';
import {BackButton} from '../../shared/components/back-button/back-button';
import {ListCartItems} from './list-cart-items/list-cart-items';
import {TeaseWishlist} from './tease-wishlist/tease-wishlist';
import {SummarizeOrder} from '../../shared/components/summarize-order/summarize-order';

@Component({
  selector: 'app-view-cart',
  imports: [
    BackButton,
    ListCartItems,
    TeaseWishlist,
    SummarizeOrder
  ],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export class ViewCart {

}
