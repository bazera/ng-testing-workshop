import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/user`);
  }

  getRagaca(): number {
    return 1;
  }

  getRagaca2(): string {
    return 'sdasd';
  }
}
