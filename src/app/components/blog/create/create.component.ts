import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog/blog.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateBlogComponent implements OnInit {

  registerForm: FormGroup;
  editorConfig: any;

  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }


  ngOnInit() {
    this.editorConfig = this.blogService.editorConfig;

    this.registerForm = this.formBuilder.group({
      title : [null, Validators.required],
      shortDescription : [null, Validators.required],
      status : [null, Validators.required],
      author : [null, [Validators.required]],
      // files: this.filesControl,
      image: [null, Validators.required],
      description: [null],
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
  }

  async onFormSubmit(form: NgForm) {
    this.blogService.addBlog(form).subscribe(res => {
      if (res.success) {
        this.openSnackBar('Post success full added');
        this.registerForm.reset();
        this.router.navigate(['/blog']);
      } else {
        this.openSnackBar('Ups! There was an error adding the post');
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
