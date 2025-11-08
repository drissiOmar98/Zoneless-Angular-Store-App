import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-empty-wishlist',
  imports: [
    MatButton,
    RouterLink,
    MatIcon
  ],
  templateUrl: './empty-wishlist.html',
  styleUrl: './empty-wishlist.scss',
})
export class EmptyWishlist {

}
