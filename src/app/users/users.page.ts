// users.page.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any[] | undefined;

  constructor(private userService: UserService) {}

  // users.page.ts

ngOnInit() {
  this.userService.getUsers().subscribe((data) => {
    this.users = data;
    console.log('Users in component:', this.users);
  });
}

}
