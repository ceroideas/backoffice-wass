import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areas-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss']
})
export class AreasPage implements OnInit {

  lat: number = 40.25084;
  lng: number = 3.421364;
  zoom: number = 5;

  constructor() { }

  ngOnInit() {
  }

}
