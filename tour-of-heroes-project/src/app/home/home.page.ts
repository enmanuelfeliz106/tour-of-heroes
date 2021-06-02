import { Location } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  location;

  constructor(private locationObj: Location) {
    this.location = locationObj;
  }

  

}
