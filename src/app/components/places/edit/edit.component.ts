import { Component, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../../../services/places/places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditPlacesComponent implements OnInit {

  @ViewChild('placesRef', null) placesRef: GooglePlaceDirective;

  editorConfig: any;
  registerForm: FormGroup;

  placeId = null;
  placeEdit: any;
  progressBar = true;

  constructor(
    private placesService: PlacesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) {

      this.registerForm = this.formBuilder.group({
        title : ['', Validators.required],
        shortDescription : ['', Validators.required],
        description : ['', Validators.required],
        status : ['', Validators.required],
        author : ['', [Validators.required]],
        image: null,
        latitude : ['', Validators.required],
        longitude : ['', Validators.required],
        address : [''],
      });
    }

  ngOnInit() {

    this.editorConfig = this.placesService.editorConfig;

    this.activatedRoute.params.subscribe((params) => {
      this.placeId = params['id'];
    });

    this.getPlaceById();
  }

  getPlaceById() {
    this.placesService.getPlaceById(this.placeId).subscribe((res) => {
      // this.placeEdit = res.place;
      this.setValuesForm(res.place);
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
    this.placesService.updatePlace(this.placeId, form).subscribe(res => {
      if (res.success) {
        this.openSnackBar('Place success full update');
        this.setValuesForm(res.place);
      } else {
        this.openSnackBar('Ups! There was an error updating the place');
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

  setValuesForm(place) {
    this.registerForm.get('title').setValue(place.title);
    this.registerForm.get('shortDescription').setValue(place.shortDescription);
    this.registerForm.get('description').setValue(place.description);
    this.registerForm.get('author').setValue(place.author);
    this.registerForm.get('status').setValue(place.status);
    this.registerForm.get('latitude').setValue(place.position.lat);
    this.registerForm.get('longitude').setValue(place.position.lng);
    this.registerForm.get('address').setValue(place.position.address);
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
