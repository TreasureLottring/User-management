import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this module
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { RouterModule } from '@angular/router';
import { PersonalDetailsComponent } from './profile-settings/personal-details/personal-details.component';
import { SecuritySettingsComponent } from './profile-settings/security-settings/security-settings.component';
import { AddressBookComponent } from './profile-settings/address-book/address-book.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    ProfileSettingsComponent,
    AddressBookComponent,
    PersonalDetailsComponent,
    SecuritySettingsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
