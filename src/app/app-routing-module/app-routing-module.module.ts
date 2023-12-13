import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {SignupComponent} from "../signup/signup.component";
import {VerifyEmailComponent} from "../verify-email/verify-email.component";
import {ResetPasswordEmailComponent} from "../reset-password-email/reset-password-email.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {WelcomePageComponent} from "../welcome-page/welcome-page.component";
import {AuthGuardService} from "../services/authGuard.service";
import {HotelListComponent} from "../hotel-list/hotel-list.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'welcome-page', component: WelcomePageComponent, canActivate:[AuthGuardService]},
  { path: 'hotel-list', component: HotelListComponent, canActivate:[AuthGuardService]},
  { path: 'users/verifyEmail/:verifyCode', component: VerifyEmailComponent},
  { path: 'sendPasswordResetEmail', component: ResetPasswordEmailComponent},
  { path: 'resetPassword/:verifyCode', component: ResetPasswordComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModuleModule { }
