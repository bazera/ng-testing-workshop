import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  userName = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user) => (this.userName = user.name));
  }
}
