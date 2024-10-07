import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Users } from '../../Model/user';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css',
})
export class PersonalDetailsComponent implements OnInit {
  personalDetailsForm: FormGroup;
  editingField: string | null = null; // Track which field is being edited
  user: Users | null = null; // Track the current user

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Initialize form with empty values initially
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser(); // Add this line
    this.userService.currentUser.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.personalDetailsForm.patchValue({
          firstName: this.user.firstName,
          surname: this.user.surname,
          email: this.user.email,
          phoneNum: this.user.PhoneNum,
        });
      }
    });
  }
  
  

  onEdit(field: string) {
    this.editingField = field; // Set the editing field
  }

  onSubmitPersonalDetails() {
    if (this.personalDetailsForm.valid) {
      const updatedUser: Users = { ...this.user, ...this.personalDetailsForm.value };
      this.userService.updateUser(updatedUser).subscribe({
        next: () => {
          alert('User details updated successfully!');
          this.editingField = null; // Exit editing mode after submission
        },
        error: (err) => {
          console.error(err);
          alert('Error updating user details');
        }
      });
    }
  }
}