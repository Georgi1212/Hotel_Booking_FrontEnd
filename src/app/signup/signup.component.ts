import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {SignupService} from "../services/signup.service";
import {UserTypeService} from "../services/userType.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  signupForm: FormGroup;

  errorMessage: string = '';
  passwordMismatch: boolean = false;

  infoMessage: string = '';
  isInfoMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private userTypeService: UserTypeService, //inject UserTypeService
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')],
      confirmPassword: ['', Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')], //},
      firstName: [''],
      lastName: [''],
      phoneNumber: ['', Validators.pattern('^[0-9]{4,15}$')],
      dateOfBirth: [''],
      address: [''],
      userType: ['', Validators.pattern('^(USER|ADMIN)$')]
    })
  }

  signup(){
    if(!this.signupForm.valid){
      return;
    }

    this.errorMessage = '';

    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    const userType = this.userTypeService.getSelectedUserType();
    this.signupForm.patchValue({userType});

    this.signupService.signup(this.signupForm.value).subscribe({
      next: (value) => {
        this.showInfo(value.message);
      },
      error: () => {
        this.errorMessage = 'An error occurred during signup';
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
