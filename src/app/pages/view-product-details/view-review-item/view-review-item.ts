import {Component, input} from '@angular/core';
import {UserReview} from '../../../shared/models/user-review';
import {ViewPanel} from '../../../shared/directives/view-panel';
import {StarRating} from '../../../shared/components/star-rating/star-rating';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-view-review-item',
  imports: [
    ViewPanel,
    StarRating,
    DatePipe
  ],
  templateUrl: './view-review-item.html',
  styleUrl: './view-review-item.scss',
})
export class ViewReviewItem {

  review = input.required<UserReview>();

}
