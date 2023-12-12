import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PasswordRequest} from "../model/password";
import {ResetPasswordService} from "../services/reset-password-service";

@Component({
  selector: 'app-reset-password',
  //standalone: true,
  //imports: [CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  passwordMismatch: boolean = false;
  verifyCode!: string;
  email!:string;

  infoMessage!: string;
  isInfoMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => this.verifyCode = params['verifyCode']);

    this.resetPasswordForm = this.fb.group({
      email: [this.email, Validators.email],
      password: ['', Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')],
      confirmPassword: ['', Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')]
    })
  }

  resetPassword(){
    if(!this.resetPasswordForm.valid){
      return;
    }

    const password = this.resetPasswordForm.get('password')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    const resetPasswordDto: PasswordRequest = { password: password, confirm_password: confirmPassword };

    this.resetPasswordService.resetPassword(this.verifyCode, resetPasswordDto).subscribe({
      next: (value: { message: string; }) => {

        this.showInfo(value.message);
      },
      error: (err: { message: string; }) => {
        this.showInfo(err.message);
      }
    });
  }
  public showInfo(message:string): void {
    this.isInfoMessage = true;
    this.infoMessage = message;
  }

  public closeModal(): void {
    this.isInfoMessage = false;
    this.infoMessage = '';
  }
}
