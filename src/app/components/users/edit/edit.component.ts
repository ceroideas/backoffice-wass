import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';
import { UserModel } from '../../../models/UserModel';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditUsersComponent implements OnInit {

  registerForm: FormGroup;
  userId = null;
  progressBar = true;

  foods = [
    {value: 'es', viewValue: 'Spanish'}
  ];
  status = [
    {value: 'enabled', viewValue: 'Enable'},
    {value: 'disabled', viewValue: 'Disable'}
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private snackBar: MatSnackBar) {

      this.registerForm = this.formBuilder.group({
        name : [null, Validators.required],
        firstName : [null, Validators.required],
        nationality : [null, Validators.required],
        email : [null, [Validators.required, Validators.email]],
        // password : [null, [Validators.required, Validators.minLength(6)]],
        status : [null, Validators.required],
      });
    }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.getUserById();
  }

  getUserById() {
    this.usersService.getUserById(this.userId).subscribe((res) => {
      this.setValuesForm(res.user);
      this.progressBar = false;
    }, (error) => {

    });
  }

  async onFormSubmit(form: NgForm) {
    this.usersService.updateUser(this.userId, form).subscribe(res => {
      if (res.success) {
        this.openSnackBar('User success full update');
        this.setValuesForm(res.user);
      } else {
        this.openSnackBar('Ups! There was an error updating the user');
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

  setValuesForm(user) {
    this.registerForm.get('name').setValue(user.name);
    this.registerForm.get('firstName').setValue(user.firstName);
    this.registerForm.get('nationality').setValue(user.nationality);
    this.registerForm.get('email').setValue(user.email);
    // this.registerForm.get('password').setValue(user.password);
    this.registerForm.get('status').setValue(user.status);
  }
}
