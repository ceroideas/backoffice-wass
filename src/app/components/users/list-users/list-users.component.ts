import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from '../../../services/excel/excel.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit {

  users: any;
  exportUsers = [];
  progressBar = true;

  dataSource;
  pageActived: number = 1;
  filterUsers = '';

  constructor(
    private usersService: UsersService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.users().subscribe(res => {
      this.progressBar = false;

      if (res.success) {
        this.dataSource = res.users;
        this.addUsersDataExport(res.users);

      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }

  async addUsersDataExport(users) {
    await users.map((user) => {
      this.exportUsers.push({
        name: user.name,
        firstName: user.firstName,
        email: user.email,
        nationality: user.nationality,
        register: user.createdOn,
        lastAccess: user.lastAccessOn,
      });
    });
  }

  exportAsXLSX() {
    console.log(this.exportUsers);
    this.excelService.exportAsExcelFile(this.exportUsers, 'sample');
  }

}
