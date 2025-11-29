import {Component, inject, input, Input, signal} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {MatIcon} from '@angular/material/icon';
import {ToggleWishlistButton} from '../../../shared/components/toggle-wishlist-button/toggle-wishlist-button';
import {MatButton, MatIconButton} from '@angular/material/button';
import {QtySelector} from '../../../shared/components/qty-selector/qty-selector';
import {TitleCasePipe} from '@angular/common';
import {CartStore} from '../../../core/store/cart.store';
import {StockStatus} from '../stock-status/stock-status';
import {StarRating} from '../../../shared/components/star-rating/star-rating';

@Component({
  selector: 'app-product-info',
  imports: [
    MatIcon,
    ToggleWishlistButton,
    MatIconButton,
    QtySelector,
    MatButton,
    TitleCasePipe,
    StockStatus,
    StarRating
  ],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  product = input.required<Product>();
  cartStore = inject(CartStore);
  quantity = signal(1);

}
