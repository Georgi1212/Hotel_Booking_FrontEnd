import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularMaterialModule} from './angular-material/angular-material.module'
import {AppRoutingModuleModule} from "./app-routing-module/app-routing-module.module";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {SignupComponent} from "./signup/signup.component";
import {InfoEmailComponent} from "./info-email/info-email.component";
import {AppComponent} from "./app.component";
import {UserTypeComponent} from "./user-type/user-type.component";
import {VerifyEmailComponent} from "./verify-email/verify-email.component";
import {ResetPasswordEmailComponent} from "./reset-password-email/reset-password-email.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {HotelListComponent} from "./hotel-list/hotel-list.component";
import {HotelDetailsComponent} from "./hotel-details/hotel-details.component";
import {ImageSliderComponent} from "./image-slider/image-slider.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {ErrorModalComponent} from "./error-modal/error-modal.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {AdminHotelRoomsDetailsComponent} from "./admin-hotel-rooms-details/admin-hotel-rooms-details.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    InfoEmailComponent,
    UserTypeComponent,
    VerifyEmailComponent,
    ResetPasswordEmailComponent,
    ResetPasswordComponent,
    WelcomePageComponent,
    HotelListComponent,
    HotelDetailsComponent,
    ImageSliderComponent,
    UserProfileComponent,
    UpdateUserComponent,
    ErrorModalComponent,
    AdminPanelComponent,
    AdminHotelRoomsDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModuleModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  exports: [CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

