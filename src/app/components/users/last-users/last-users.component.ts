import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-last-users',
  templateUrl: './last-users.component.html',
  styleUrls: ['./last-users.component.scss']
})
export class LastUsersComponent implements OnInit {

  users: any;
  progressBar = true;

  dataSource;

  lastUsers = [];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.lastUsers().subscribe(res => {
      this.progressBar = false;

      if (res.success) {
        console.log(res);
        this.dataSource = res.users;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }
}
