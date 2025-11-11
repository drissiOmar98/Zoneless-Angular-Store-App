import {Component, computed, inject, input} from '@angular/core';

import {CartItem} from '../../shared/models/cart-item';
import {QtySelector} from '../../shared/components/qty-selector/qty-selector';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CartStore} from '../../core/store/cart.store';

@Component({
  selector: 'app-show-cart-item',
  imports: [
    QtySelector,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {
  cartStore = inject(CartStore);
  item = input.required<CartItem>();

  total = computed(()=> (this.item().price * this.item().quantity).toFixed(2));


}
