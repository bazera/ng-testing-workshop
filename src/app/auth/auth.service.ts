import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  }
}
