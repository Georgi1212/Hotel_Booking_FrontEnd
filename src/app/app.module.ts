import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularMaterialModule} from './angular-material/angular-material.module'
import {AppRoutingModuleModule} from "./app-routing-module/app-routing-module.module";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {RoomSizeTypeComponent} from "./room-size-type/room-size-type.component";
import {AddRoomComponent} from "./add-room/add-room.component";
import {AddPhotosRoomComponent} from "./add-photos-room/add-photos-room.component";
import {AddHotelComponent} from "./add-hotel/add-hotel.component";
import {AddPhotoHotelComponent} from "./add-photo-hotel/add-photo-hotel.component";
import {UpdateRoomComponent} from "./update-room/update-room.component";
import {ConfirmDialogDeleteComponent} from "./confirm-dialog-delete/confirm-dialog-delete.component";
import {UpdateHotelComponent} from "./update-hotel/update-hotel.component";
import {ViewBookingsAdminComponent} from "./view-bookings-admin/view-bookings-admin.component";
import {ViewOccupanciesAdminComponent} from "./view-occupancies-admin/view-occupancies-admin.component";
import {
  TabViewBookingsOccupanciesComponent
} from "./tab-view-bookings-occupancies/tab-view-bookings-occupancies.component";
import {ViewBookingsUserComponent} from "./view-bookings-user/view-bookings-user.component";
import {CartPaymentComponent} from "./cart-payment/cart-payment.component";
import {SuccessfulPaymentComponent} from "./successful-payment/successful-payment.component";


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
    AdminHotelRoomsDetailsComponent,
    RoomSizeTypeComponent,
    AddRoomComponent,
    AddPhotosRoomComponent,
    AddHotelComponent,
    AddPhotoHotelComponent,
    UpdateRoomComponent,
    ConfirmDialogDeleteComponent,
    UpdateHotelComponent,
    ViewBookingsAdminComponent,
    ViewOccupanciesAdminComponent,
    TabViewBookingsOccupanciesComponent,
    ViewBookingsUserComponent,
    CartPaymentComponent,
    SuccessfulPaymentComponent
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
        FormsModule,
    ],
  exports: [CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

