import { makeAutoObservable } from 'mobx';
import { Game } from './types';

class RootState {
  score = 0;

  maxScore = 0;

  cols = 4;

  rows = 4;

  status = Game.PLAY;

  constructor() {
    makeAutoObservable(this);
  }

  addScore(score: number): number {
    this.score += score;
    return this.score;
  }

  setMaScore(score: number): number {
    if (score > this.maxScore) this.maxScore = score;
    return this.maxScore;
  }

  setRows(rows: number): void {
    if (rows <= 1) this.rows = 2;
    else {
      this.rows = rows;
    }
  }

  setCols(cols: number): void {
    if (cols <= 1) this.cols = 2;
    else {
      this.cols = cols;
    }
  }

  restart(): void {
    this.status = Game.PLAY;
  }

  finish(): void {
    this.status = Game.FINISH;
  }

  pause(): void {
    this.status = Game.PAUSE;
  }
}

export default RootState;
