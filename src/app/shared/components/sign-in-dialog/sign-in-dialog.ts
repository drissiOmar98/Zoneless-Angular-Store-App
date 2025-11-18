import {Component, inject, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {EcommerceStore} from '../../../core/store/ecommerce-store';
import {SignInParams} from '../../models/user';
import {SignUpDialog} from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatSuffix,
    MatPrefix,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {

  store = inject(EcommerceStore);
  fb = inject(NonNullableFormBuilder);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);


  passwordVisible = signal(false);

  signInForm = this.fb.group({
    email: ['jhon@doe.com', Validators.required],
    password: ['test123', Validators.required]
  });

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    const {email, password} = this.signInForm.value;
    this.store.signIn({email, password, checkout: this.data?.checkout, dialogId: this.dialogRef.id} as SignInParams);

  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
