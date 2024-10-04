import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']  // Note: styleUrls instead of styleUrl
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,  // Correct service name case
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],  // Username control updated to lowercase
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]  // Password control updated to lowercase
    });
  }

  // Method to handle form submission
  signUpUser(): void {
    if (this.signUpForm.valid) {
      // Prepare form data
      const formData = {
        firstName: this.signUpForm.get('firstName')?.value,
        surname: this.signUpForm.get('surname')?.value,
        username: this.signUpForm.get('username')?.value,
        email: this.signUpForm.get('email')?.value,
        phoneNum: this.signUpForm.get('phoneNum')?.value,
        password: this.signUpForm.get('password')?.value
      };

      // Prepare info for user registration
      const info = {
        firstName: formData.firstName,
        surname: formData.surname,
        phoneNum: formData.phoneNum,
        email: formData.email,
        username: formData.username,
        password: formData.password
      };

      // Call the service to register the user
      this.userService.RegisterUser(info).subscribe(
        (response: any) => {
          console.log('User has successfully registered', response);
          this.toastr.success(formData.firstName + ' has successfully registered!');

          this.router.navigate(['/profile-settings']).then(success => {
            console.log('Navigation success:', success);
          }).catch(error => {
            console.error('Navigation error:', error);
          });

        },
        (error: any) => {
          console.error('Error during registration', error);
          this.toastr.error('There was an error during registration. Please try again.');
        }
      );
    } else {
      // Show error if the form is invalid
      this.toastr.error('Please fill in all the required fields correctly.');
    }
  }
}
