import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  apiUrl = 'https://localhost:7094/api/User';


  constructor(private fb: FormBuilder , private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = {
        username: this.registerForm.value.username,
        passwordHash: this.registerForm.value.password, // Assuming you want to hash this on the server
        email: this.registerForm.value.email
    };
      this.http.post(this.apiUrl, formData)
        .pipe(
          catchError((error) => {
            console.error('Error adding user:', error);
            return of(null); // Handle the error gracefully
          })
        )
        .subscribe({
          next: () => {
            console.log('User added successfully!');
            this.registerForm.reset();
           // this.loadUsers();
          },
          error: () => {
            console.error('Error occurred during user addition.');
          }
        });
    } else {
      this.registerForm.markAllAsTouched(); // This will trigger validation messages
      console.warn('Form is invalid:', this.registerForm.errors);
    }
}

// loadUsers() {
//   this.http.get<any[]>(this.apiUrl).subscribe({
//     next: (data) => {
//       this.users = data;
//     },
//     error: (error: any) => {
//       console.error('Error loading users:', error);
//     }
//   });
// }
}
