import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PlacesService } from '../../../services/places/places.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

declare var google:any;

@Component({
  selector: 'app-edit-community',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditCommunitiesComponent implements OnInit {

  registerForm: FormGroup;
  markers:any = [];
  map;
  color = '#fff';
  communityId;
  progressBar = true;

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlacesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  	this.registerForm = this.formBuilder.group({
      street : [null, Validators.required],
      color : [null, Validators.required]
    });
  }

  ngOnInit() {

  	this.activatedRoute.params.subscribe((params) => {
      this.communityId = params['id'];
    });

    this.getCommunityById();
  }

  getCommunityById()
  {
  	this.placeService.getCommunityById(this.communityId).subscribe((res)=>{
  		this.progressBar = false;
  		this.setValuesForm(res.community);
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
    this.placeService.updateCommunity(this.communityId,form).subscribe(res => {
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

  setValuesForm(community)
  {
    setTimeout(()=>{
	  	this.registerForm.controls['street'].setValue(community.street);
	    this.registerForm.controls['color'].setValue(community.color);
	    this.color = community.color;
	    let locations = community.locations;

	    this.map = new google.maps.Map(document.getElementById('map'), {
	      center: {lat:locations[0].lat, lng:locations[0].lng},
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

	    var marker;

	    for (var i = 0; i < locations.length; ++i) {
	    	marker = new google.maps.Marker({
			    position: {lat:locations[i].lat, lng:locations[i].lng},
			    map: this.map,
			});
			this.markers.push(marker);
	    }
    },1000)
  }

}
