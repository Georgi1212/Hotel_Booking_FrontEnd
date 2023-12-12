import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ResetPasswordEmailService} from "../services/reset-password-email-service";

@Component({
  selector: 'app-reset-password-email',
  //standalone: true,
  //imports: [CommonModule],
  templateUrl: './reset-password-email.component.html',
  styleUrl: './reset-password-email.component.css'
})
export class ResetPasswordEmailComponent {
  resetPasswordEmailForm: FormGroup;
  infoMessage!: string;
  isInfoMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resetPasswordEmailService: ResetPasswordEmailService,
    private router: Router
  ) {
    this.resetPasswordEmailForm = this.fb.group({
      email: ['', Validators.email]
    });
  }

  resetPasswordEmail(){
    if(!this.resetPasswordEmailForm.valid){
      return;
    }

    this.resetPasswordEmailService.sendPasswordResetEmail(this.resetPasswordEmailForm.value).subscribe({
      next: (value: { message: string; }) => {
        this.showInfo(value.message);
      },
      error: (err: { message: string; }) => {
        this.infoMessage = err.message;
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
