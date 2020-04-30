import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places/places.service';

@Component({
  selector: 'app-place-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss']
})
export class PlacesPage implements OnInit {

  places: any;
  progressBar = true;
  pageActived: number = 1;
  filterBlogs = '';

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces() {
    this.placesService.getAllPlaces().subscribe(res => {
      this.progressBar = false;

      if (res.success) {
        this.places = res.places;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }

  deletePlace(place) {
    this.progressBar = true;
    this.placesService.deletePlace(place._id).subscribe((res) => {
      if (res.success) {
        const index = this.places.indexOf(place);
        this.places.splice(index, 1);
        this.progressBar = false;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }

  firstImage(place) {
    return place.images[0].img ? place.images[0].img : '';
  }

}
