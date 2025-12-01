import {Component, computed, inject, input} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ViewPanel} from '../../../shared/directives/view-panel';
import {RatingSummary} from '../rating-summary/rating-summary';
import {ViewReviewItem} from '../view-review-item/view-review-item';
import {MatButton} from '@angular/material/button';
import {EcommerceStore} from '../../../core/store/ecommerce-store';
import {WriteReview} from '../write-review/write-review';

@Component({
  selector: 'app-view-reviews',
  imports: [
    ViewPanel,
    RatingSummary,
    ViewReviewItem,
    MatButton,
    WriteReview
  ],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {

  store = inject(EcommerceStore);

  product = input.required<Product>();

  sortedReviews = computed(() => {
    return [...this.product().reviews].sort((a,b) => b.reviewDate.getTime() - a.reviewDate.getTime());
  });

}
