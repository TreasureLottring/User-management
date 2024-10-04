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

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    ProfileSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule, // Add this line
    ToastrModule.forRoot() // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
