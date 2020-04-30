import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  basketballs : string[] = [];
  muse : string[] = [];
  pop : string[] = [];
  constructor() { }

  ngOnInit() {
    this.basketballs.push('../assets/basketball/basketball2.jpg');
    this.basketballs.push('../assets/basketball/basketball3.jpg');
    this.basketballs.push('../assets/basketball/basketball4.jpg');

    this.muse.push('../assets/muse/muse2.jpg');
    this.muse.push('../assets/muse/muse3.jpg');
    this.muse.push('../assets/muse/muse4.jpg');

    this.pop.push('../assets/pop/pop2.jpg');
    this.pop.push('../assets/pop/pop3.jpg');
    this.pop.push('../assets/pop/pop4.jpg');
    this.pop.push('../assets/pop/pop5.jpg');

  }

}
