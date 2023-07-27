import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  onLogin(username: string, password: string): void {
    this.authService.login(username, password).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
