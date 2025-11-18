import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {EcommerceStore} from '../../../core/store/ecommerce-store';
import {SignUpParams} from '../../models/user';
import {SignInDialog} from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatDialogClose,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatPrefix,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {

  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);
  dialogRef = inject(MatDialogRef);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  matDialog = inject(MatDialog);

  signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['jhon@test.com', Validators.required],
    password: ['test123', Validators.required],
    confirmPassword: ['test123', Validators.required]
  });

  signUp() {
    if(!this.signUpForm.valid){
      this.signUpForm.markAllAsTouched();
      return;
    }
    const {name , email, password} = this.signUpForm.value;
    this.store.signUp({name, email, password, dialogId: this.dialogRef.id, checkout: this.data?.checkout} as SignUpParams);

  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
