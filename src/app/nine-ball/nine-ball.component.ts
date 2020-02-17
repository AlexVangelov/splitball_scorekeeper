import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const BALL_COLORS = [
  'gold',
  'blue',
  'red',
  'darkviolet',
  'darkorange',
  'green',
  'brown',
  'black'
];

const SL_TARGETS = {
  1: 14,
  2: 19,
  3: 25,
  4: 31,
  5: 38,
  6: 46,
  7: 55,
  8: 65,
  9: 75
}

const SL_LOSER_SCORE = {
  1: [2, 3, 4, 6, 7, 8, 10, 11, 13],
  2: [3, 5, 7, 8, 10, 12, 14, 16, 18],
  3: [4, 6, 9, 11, 14, 16, 19, 21, 24],
  4: [5, 8, 11, 14, 18, 21, 24, 27, 30],
  5: [6, 10, 14, 18, 22, 26, 29, 33, 37],
  6: [8, 12, 17, 22, 27, 31, 36, 40, 45],
  7: [10, 15, 21, 26, 32, 37, 43, 49, 54],
  8: [13, 19, 26, 32, 39, 45, 52, 58, 64],
  9: [17, 24, 31, 38, 46, 53, 60, 67, 74]
}

@Component({
  selector: 'apa-nine-ball',
  templateUrl: './nine-ball.component.html',
  styleUrls: ['./nine-ball.component.scss']
})
export class NineBallComponent implements OnInit {
  rack: any;
  racks: Array<any> = [];
  balls: any;
  currentPlayer = 1;
  players: any = {};
  innings = 0;

  constructor(private _snackBar: MatSnackBar) { };

  ngOnInit() {
    this.players[1] = { name: 'Player 1', score: 0, target: 75, sl: 9 };
    this.players[2] = { name: 'Player 2', score: 0, target: 75, sl: 9 };

    this.initBalls();
    this.initRack();
  }

  initBalls() {
    this.balls = {};
    [...Array(9).keys()].forEach(i => {
      this.balls[i + 1] = {
        color: BALL_COLORS[i % 8],
        stripe: i > 7
      };
    });
  }

  initRack(prevRack?) {
    this.rack = {
      carryScore: {
        1: prevRack ? prevRack.score[1] + prevRack.carryScore[1] : 0,
        2: prevRack ? prevRack.score[2] + prevRack.carryScore[2] : 0,
      },
      carryDead: prevRack ? prevRack.dead : 0,
      score: {
        1: 0,
        2: 0
      },
      innings: 0,
      dead: 0,
      defenses: 0,
      timeouts: 0,
      balls: this.balls,
      done: false
    };
    this.calcRack();
  }

  calcMatch() {
    [1, 2].forEach((p) => {
      let player = this.players[p];
      if (player.sl) {
        for (let s = 0; s < 8; s++) {
          let breakpoint = SL_LOSER_SCORE[player.sl][s];
          if (player.score < breakpoint) {
            this.players[p % 2 + 1].possible = {
              score: 20 - s,
              next: breakpoint - player.score
            };
            break;
          }
        }
      }
    });
  }

  calcRack() {
    let dead = 0
    for (const d in this.balls) {
      if (this.balls[d].dead) {
        dead++;
      }
    }
    this.rack.dead = dead;
    if (this.rack.score[1] + this.rack.score[2] + this.rack.dead === 10) {
      this.rack.done = true;
    }
    this.calcMatch();
  }

  newRack() {
    const prevRack = this.rack;
    this.initBalls();
    this.initRack(prevRack);
    this.racks.push(prevRack);
  }

  asIsOrder(a, b) {
    return 1;
  }

  onBallClick(ev, player, number) {
    if (!this.balls[number].potted) {
      this.balls[number].potted = player.key;
      this.rack.score[player.key]++;
      if (number == 9) {
        this.rack.score[player.key]++;
        for (const b in this.balls) {
          if (!this.balls[b].potted) {
            this.balls[b].potted = true;
            this.balls[b].dead = true;
          }
        }
      }
    }
    this.players[player.key].score = this.rack.score[player.key] + this.rack.carryScore[player.key];
    this.calcRack();
  }

  onBallContextMenu(ev, player, number) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.balls[number].potted) {
      if (!this.balls[number].dead) {
        this.players[this.balls[number].potted].score--;
        this.rack.score[this.balls[number].potted]--;
      }
      if (number == 9) {
        if (!this.balls[number].dead) {
          this.players[this.balls[number].potted].score--;
          this.rack.score[this.balls[number].potted]--;
        }
        for (const b in this.balls) {
          if (this.balls[b].potted === true) {
            delete this.balls[b].potted;
            delete this.balls[b].dead;
          }
        }
      }
      this.balls[number].potted = null;
      this.balls[number].dead = null;
      // this.players[player.key].score = this.rack.score[player.key] + this.rack.carryScore[player.key];
      this.calcRack();
    }
  }

  onBallDblClick(ev, player, number) {
    if (!this.balls[number].dead) {
      if (this.balls[number].potted !== player.key) {
        this._snackBar.open(`Ball ${number} is not potted by this player!`, 'Got it!', {
          duration: 5000
        });
        return;
      }
      this.players[this.balls[number].potted].score--;
      if (number == 9) {
        this.players[this.balls[number].potted].score--;
        this.balls[number].disabled = true;
        setTimeout(() => {
          delete this.balls[number].potted;
          this.balls[number].dead = !this.balls[number].dead;
          delete this.balls[number].disabled;
        }, 1000);
      }
      this.balls[number].potted = player.key;
      this.balls[number].dead = !this.balls[number].dead;
    }
  }

  onSelectedTabChange(tab) {
    this.currentPlayer = tab.index + 1;
    if (this.rack.done) {
      return;
    }
    // if (this.currentPlayer === 1) {
    //   this.rack.innings++;
    //   let snackBarRef = this._snackBar.open(`Innings +1 / Total: ${this.rack.innings}`, 'Undo', {
    //     duration: 3000,
    //     verticalPosition: 'top'
    //   });
    //   snackBarRef.onAction().subscribe(() => {
    //     this.rack.innings--;
    //   });
    // }
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    return value;
  }

  decInnings() {
    if (this.rack.innings > 0) {
      this.rack.innings--;
    }
  }

  incInnings() {
    this.rack.innings++;
  }

  gameOver() {
    console.log('Game Over!');
  }
}
