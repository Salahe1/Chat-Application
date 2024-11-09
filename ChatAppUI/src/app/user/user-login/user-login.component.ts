import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  username: string = '';  // Initialize as an empty string
  password: string = '';  // Initialize as an empty string
  

  constructor(private router: Router,private authService:AuthService) {}

  onSubmit() {
    // Ensure username and password are both strings
    if (this.username && this.password) {
      this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        response => {
          // Handle successful login
          console.log('Login successful:', response);
          const tokenObj = response.token; // or however you receive the token
          const jwtToken = tokenObj.result; // Extract the JWT string itself

          if (jwtToken) { // make sure the token exists
              localStorage.setItem('token', jwtToken); // Store token in localStorage
              this.authService.saveToken(jwtToken); // Store the token in AuthService
              this.authService.logTokenClaims();
          }
          this.router.navigate(['/chat-layout']);
        },
        error => {
          // Handle login error
          console.error('Login failed:', error);
        }
      );
      
    } else {
      alert('Invalid credentials');
    }

  }

}
