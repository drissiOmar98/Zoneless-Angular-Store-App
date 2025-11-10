import {Component, inject, input, output} from '@angular/core';
import {Product} from '../../models/product';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {CartStore} from '../../../core/store/cart.store';


@Component({
  selector: 'app-product-card',
  imports: [
    MatIcon,
    MatButton,

  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  cartStore = inject(CartStore);

  product = input.required<Product>();





}
