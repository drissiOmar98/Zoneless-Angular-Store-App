import {Component, computed, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  imports: [
    MatIcon
  ],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
})
export class StarRating {
  rating = input.required<number>();

  starArray = computed(()=> {
    const fullStars = Math.floor(this.rating());
    return Array(5).fill(false).map((_, index) => index < fullStars);
  });


}
