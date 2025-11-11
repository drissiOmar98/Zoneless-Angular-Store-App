import { Component } from '@angular/core';
import {BackButton} from '../../shared/components/back-button/back-button';
import {ListCartItems} from './list-cart-items/list-cart-items';
import {TeaseWishlist} from './tease-wishlist/tease-wishlist';

@Component({
  selector: 'app-view-cart',
  imports: [
    BackButton,
    ListCartItems,
    TeaseWishlist
  ],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export class ViewCart {

}
