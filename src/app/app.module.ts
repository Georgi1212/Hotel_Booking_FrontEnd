import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    InfoEmailComponent,
    UserTypeComponent,
    VerifyEmailComponent,
    ResetPasswordEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModuleModule,
    ReactiveFormsModule
  ],
  exports: [CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//platformBrowser().bootstrapModule(AppModule).then(r => r);