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
import {HotelDetailsComponent} from "../hotel-details/hotel-details.component";
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import {AdminHotelRoomsDetailsComponent} from "../admin-hotel-rooms-details/admin-hotel-rooms-details.component";
import {AddRoomComponent} from "../add-room/add-room.component";
import {AddHotelComponent} from "../add-hotel/add-hotel.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'welcome-page', component: WelcomePageComponent, canActivate:[AuthGuardService]},
  { path: 'hotel-list', component: HotelListComponent, canActivate:[AuthGuardService]},
  { path: 'hotel-details/:hotelId', component: HotelDetailsComponent, canActivate:[AuthGuardService]},
  { path: 'profile', component: UserProfileComponent, canActivate:[AuthGuardService]},
  { path: 'admin-panel', component: AdminPanelComponent, canActivate:[AuthGuardService]},
  { path: 'admin-panel/hotel-rooms-details/:hotelId', component: AdminHotelRoomsDetailsComponent, canActivate:[AuthGuardService]},
  { path: ':hotelId/add-room/newRoom', component: AddRoomComponent, canActivate:[AuthGuardService]},
  { path: 'newHotel', component: AddHotelComponent, canActivate:[AuthGuardService]},
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
