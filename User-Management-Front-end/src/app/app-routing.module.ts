import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddressBookComponent } from './profile-settings/address-book/address-book.component';
import { PersonalDetailsComponent } from './profile-settings/personal-details/personal-details.component';
import { SecuritySettingsComponent } from './profile-settings/security-settings/security-settings.component';
import { LoginComponent } from './login/login.component';

  const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent},
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent,
    children: [
      { path: 'personal-details', component: PersonalDetailsComponent },
      { path: 'security-settings', component: SecuritySettingsComponent },
      { path: 'address-book', component: AddressBookComponent }
    ]
  },
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' } // Optional default route
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
