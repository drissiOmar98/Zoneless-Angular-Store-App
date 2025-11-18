import { Component } from '@angular/core';
import {ViewPanel} from '../../../shared/directives/view-panel';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-shipping-form',
  imports: [
    ViewPanel,
    MatIcon,
    MatFormField,
    MatInput
  ],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.scss',
})
export class ShippingForm {

}
