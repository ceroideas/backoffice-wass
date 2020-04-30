import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places/places.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.page.html',
  styleUrls: ['./communities.page.scss']
})
export class CommunitiesPage implements OnInit {

  communities: any;
  progressBar = true;
  pageActived: number = 1;
  filterCommunities = '';

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.getCommunities();
  }

  getCommunities() {
    this.placesService.getAllCommunities().subscribe(res => {
      this.progressBar = false;

      if (res.success) {
        this.communities = res.communities;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }

  deleteCommunity(community) {
    this.progressBar = true;
    this.placesService.deleteCommunity(community._id).subscribe((res) => {
      if (res.success) {
        const index = this.communities.indexOf(community);
        this.communities.splice(index, 1);
        this.progressBar = false;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }

  // firstImage(community) {
  //   return community.images[0].img ? community.images[0].img : '';
  // }

}
