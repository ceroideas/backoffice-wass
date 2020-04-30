import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditBlogComponent implements OnInit {

  editorConfig: any;
  registerForm: FormGroup;

  blogId = null;
  blogEdit: any;
  progressBar = true;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) {

      this.registerForm = this.formBuilder.group({
        title : ['', Validators.required],
        shortDescription : ['', Validators.required],
        status : ['', Validators.required],
        author : ['', [Validators.required]],
        description : ['', [Validators.required]],
        image: null
      });
    }

  ngOnInit() {

    this.editorConfig = this.blogService.editorConfig;

    this.activatedRoute.params.subscribe((params) => {
      this.blogId = params['id'];
    });

    this.getBlogById();
  }

  getBlogById() {
    this.blogService.getBlogById(this.blogId).subscribe((res) => {
      this.blogEdit = res.blog;
      this.setValuesForm(res.blog);
      this.progressBar = false;
    }, (error) => {

    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        let result = reader.result;

        this.registerForm.get('image').setValue(result);
      };
    }
    console.log(event);
  }

  async onFormSubmit(form: NgForm) {
    this.blogService.updateBlog(this.blogId, form).subscribe(res => {
      if (res.success) {
        this.openSnackBar('Post success full update');
        this.setValuesForm(res.blog);
      } else {
        this.openSnackBar('Ups! There was an error updating the post');
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

  setValuesForm(blog) {
    this.registerForm.get('title').setValue(blog.title);
    this.registerForm.get('shortDescription').setValue(blog.shortDescription);
    this.registerForm.get('description').setValue(blog.description);
    this.registerForm.get('author').setValue(blog.author);
    this.registerForm.get('status').setValue(blog.status);
  }

}
