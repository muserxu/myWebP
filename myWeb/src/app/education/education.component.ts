import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  images:string[] = [];
  constructor() { }

  ngOnInit() {
    this.images.push('../assets/grad2.png');
    this.images.push('../assets/grad3.jpg');
    this.images.push('../assets/grad4.jpg');

  }

}
