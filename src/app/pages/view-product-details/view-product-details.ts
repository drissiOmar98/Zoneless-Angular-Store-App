import {Component, inject, input} from '@angular/core';
import {EcommerceStore} from '../../core/store/ecommerce-store';

@Component({
  selector: 'app-view-product-details',
  imports: [],
  templateUrl: './view-product-details.html',
  styleUrl: './view-product-details.scss',
})
export class ViewProductDetails {

  productId = input.required<string>();
  store = inject(EcommerceStore);

  constructor() {
    this.store.setProductId(this.productId);
  }

}
