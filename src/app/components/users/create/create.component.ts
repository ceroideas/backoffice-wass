import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';
import { UserModel } from '../../../models/UserModel';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-users',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUsersComponent implements OnInit {

  registerForm: FormGroup;

  foods = [
    {value: 'es', viewValue: 'Spanish'}
  ];

  status = [
    {value: 'enabled', viewValue: 'Enable'},
    {value: 'disabled', viewValue: 'Disable'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name : [null, Validators.required],
      firstName : [null, Validators.required],
      nationality : [null, Validators.required],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.minLength(6)]],
      status : [null, Validators.required],
    });
  }

  async onFormSubmit(form: NgForm) {
    this.usersService.addUser(form).subscribe(res => {
      if (res.success) {
        this.openSnackBar('User success full added');
        this.registerForm.reset();
      } else {
        this.openSnackBar('Ups! There was an error adding the user');
      }
    }, (error) => {
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom'
    });
  }
}
