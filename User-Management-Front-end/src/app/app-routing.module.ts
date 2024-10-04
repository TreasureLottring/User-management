import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile-settings', component: ProfileSettingsComponent },
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' } // Optional default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
