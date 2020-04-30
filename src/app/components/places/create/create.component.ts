import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PlacesService } from '../../../services/places/places.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-create-places',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePlacesComponent implements OnInit {

  @ViewChild('placesRef', null) placesRef: GooglePlaceDirective;

  registerForm: FormGroup;
  editorConfig: any;


  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlacesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }


  ngOnInit() {
    this.editorConfig = this.placeService.editorConfig;

    this.registerForm = this.formBuilder.group({
      title : [null, Validators.required],
      shortDescription : [null, Validators.required],
      description : [null, Validators.required],
      status : [null, Validators.required],
      author : [null, [Validators.required]],
      image: [null, Validators.required],
      latitude : [null, Validators.required],
      longitude : [null, Validators.required],
      address : [null],

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
    this.placeService.addPlace(form).subscribe(res => {
      if (res.success) {
        this.openSnackBar('Place success full added');
        this.registerForm.reset();
        this.router.navigate(['/places']);
      } else {
        this.openSnackBar('Ups! There was an error adding the place');
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

  public handleAddressChange(address) {
    this.setLatLng(address.name, address.geometry.location.lat(), address.geometry.location.lng());
  }

  public setLatLng(address: any, lat: any, lng: any) {
    this.registerForm.get('latitude').setValue(lat);
    this.registerForm.get('longitude').setValue(lng);
    this.registerForm.get('address').setValue(address);
  }
}
