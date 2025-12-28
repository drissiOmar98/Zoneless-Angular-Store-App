import {Component, computed, inject, input} from '@angular/core';
import {EcommerceStore} from '../../core/store/ecommerce-store';
import {BackButton} from '../../shared/components/back-button/back-button';
import {ProductInfo} from './product-info/product-info';
import {ViewReviews} from './view-reviews/view-reviews';
import {ViewReviewItem} from './view-review-item/view-review-item';

@Component({
  selector: 'app-view-product-details',
  imports: [
    BackButton,
    ProductInfo,
    ViewReviews,
  ],
  templateUrl: './view-product-details.html',
  styleUrl: './view-product-details.scss',
})
export class ViewProductDetails {

  productId = input.required<string>();
  store = inject(EcommerceStore);

  constructor() {
    this.store.setProductId(this.productId);
    this.store.setProductSeoTags(this.store.selectedProduct);
  }

  backRoute = computed(() => `/products/${this.store.category()}`);

}
