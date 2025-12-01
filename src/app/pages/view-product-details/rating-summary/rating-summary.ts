import {Component, computed, input} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {StarRating} from '../../../shared/components/star-rating/star-rating';

@Component({
  selector: 'app-rating-summary',
  imports: [
    StarRating
  ],
  templateUrl: './rating-summary.html',
  styleUrl: './rating-summary.scss',
})
export class RatingSummary {
  product = input.required<Product>();

  totalReviews = computed(() => this.product().reviews.length);


  /**
   * Generates the rating breakdown:
   * - For each star level (5 → 1)
   * - Count how many reviews gave that rating
   * - Calculate its percentage share
   */
  ratingBreakdown = computed(() => {
    const reviews = this.product().reviews;
    const total = reviews.length;

    // If no reviews, return all-star levels with zero stats
    if (total === 0) {
      return [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: 0,
        percentage: 0,
      }));
    }

     // Build breakdown array for each star level
    return [5, 4, 3, 2, 1].map((stars) => {
       // Count reviews with this rating
      const count = reviews.filter((r) => r.rating === stars).length;
       // Compute percentage for progress bar
      return {
        stars,
        count,
        percentage: (count / total) * 100,
      };
    });
  });

}
