import {Component, inject, signal} from '@angular/core';

import {ViewPanel} from '../../../shared/directives/view-panel';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {OptionItem} from '../../../shared/models/option-item';
import {MatLabel,MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {EcommerceStore} from '../../../core/store/ecommerce-store';
import {AddReviewParams} from '../../../shared/models/user-review';


@Component({
  selector: 'app-write-review',
  imports: [
    ViewPanel,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss',
  host: {
    class: 'block',
  }
})
export class WriteReview {
  store = inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);

  ratingOptions = signal<OptionItem[]>([
    {label: '5 Stars - Excellent', value: 5},
    {label: '4 Stars - Good', value: 4},
    {label: '3 Stars - Average', value: 3},
    {label: '2 Stars - Poor', value: 2},
    {label: '1 Stars - Terrible', value: 1},

  ]);

  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required],
  });


  saveReview() {
    if (!this.reviewForm.valid){
      this.reviewForm.markAllAsTouched();
      return;
    }

    const {title , comment, rating } = this.reviewForm.value;
    this.store.addReview({title, comment, rating} as AddReviewParams);

  }
}
