import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'apa-eight-ball',
  templateUrl: './eight-ball.component.html',
  styleUrls: ['./eight-ball.component.scss']
})
export class EightBallComponent implements OnInit {
  balls: any = {};
  constructor() { }

  ngOnInit() {
    [...Array(15).keys()].forEach(i => {
      this.balls[i+1] = {};
    });
  }

}
