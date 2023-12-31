import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router'
import { AuthService } from '../services/auth.service'
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  //standalone: true,
  //imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')]
    });
  }

  login(){
    if(!this.loginForm.valid){
      return;
    }

    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        localStorage.setItem('email', this.loginForm.get('email')?.value);

        const userType = this.userService.getUserType(this.loginForm.get('email')?.value)
          .subscribe((userType) => {
            if(userType === 'USER'){
              this.router.navigate(['welcome-page']).then(r=>r);
            }
            else if(userType === 'ADMIN'){
              this.router.navigate(['admin-panel']).then(r=>r);
            }
        })

        //this.router.navigate(['welcome-page']).then(r=>r);
      },
      error: () => {
        this.errorMessage = 'Email or password is incorrect';
      }
    });
  }

}
