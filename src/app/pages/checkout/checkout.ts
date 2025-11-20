import {Component, inject} from '@angular/core';
import {BackButton} from '../../shared/components/back-button/back-button';
import {ShippingForm} from './shipping-form/shipping-form';
import {PaymentForm} from './payment-form/payment-form';
import {SummarizeOrder} from '../../shared/components/summarize-order/summarize-order';
import {CartStore} from '../../core/store/cart.store';
import {MatButton} from '@angular/material/button';
import {EcommerceStore} from '../../core/store/ecommerce-store';

@Component({
  selector: 'app-checkout',
  imports: [
    BackButton,
    ShippingForm,
    PaymentForm,
    SummarizeOrder,
    MatButton
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {

   cartStore = inject(CartStore);
   store = inject(EcommerceStore);

}
