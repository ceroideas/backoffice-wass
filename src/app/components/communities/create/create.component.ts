import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PlacesService } from '../../../services/places/places.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

declare var google:any;

@Component({
  selector: 'app-create-community',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateCommunitiesComponent implements OnInit {

  registerForm: FormGroup;
  markers:any = [];
  map;
  color = '#fff';

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlacesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      street : [null, Validators.required],
      color : [null, Validators.required]
    });

  	this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.698391, lng: -4.443494},
      zoom: 16
    });

    this.map.addListener('click',(res)=>{
    	let lat = res.latLng.lat();
    	let lng = res.latLng.lng();

    	var marker = new google.maps.Marker({
		    position: {lat:lat, lng:lng},
		    map: this.map,
		  });

      this.markers.push(marker);
    });
  }

  deleteMarkers()
  {
    for(let i=0; i<this.markers.length; i++){
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  async onFormSubmit(form: NgForm) {
    form['locations']=this.countMarkers();
    console.log(form);
    this.placeService.addCommunity(form).subscribe(res => {
      if (res.success) {
        this.openSnackBar('Community success full added');
        this.registerForm.reset();
        this.router.navigate(['/communities']);
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

  countMarkers()
  {
    let markers = [];
    for (let i = 0; i < this.markers.length; i++) {
      markers.push({lat:this.markers[i].position.lat(),lng:this.markers[i].position.lng()});
    }
    return markers;
  }

  changeComplete(ev)
  {
    this.color = ev.color.hex;
    this.registerForm.controls['color'].setValue(ev.color.hex);
  }

}
