import {Injectable} from '@angular/core';


@Injectable({
  providedIn: "root",
})

export class CategoryApi {

  private categories = [
    'all',
    'electronics',
    'photography',
    'clothing',
    'gaming',
    'luxury',
    'sneakers',
    'sunglasses',
    'furniture',
    'kitchen'
  ];

  getCategories() {
    return this.categories;
  }


}
