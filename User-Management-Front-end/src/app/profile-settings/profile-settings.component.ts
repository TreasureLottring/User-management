import { Component } from '@angular/core';
import { Users } from '../Model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})


export class ProfileSettingsComponent {


  currentUser: Users | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onLogout() {
    this.userService.logout();
  }
}
