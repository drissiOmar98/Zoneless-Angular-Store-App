import {Component, computed, input} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ViewPanel} from '../../../shared/directives/view-panel';
import {RatingSummary} from '../rating-summary/rating-summary';
import {ViewReviewItem} from '../view-review-item/view-review-item';

@Component({
  selector: 'app-view-reviews',
  imports: [
    ViewPanel,
    RatingSummary,
    ViewReviewItem
  ],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {

  product = input.required<Product>();

  sortedReviews = computed(() => {
    return [...this.product().reviews].sort((a,b) => b.reviewDate.getTime() - a.reviewDate.getTime());
  });

}
