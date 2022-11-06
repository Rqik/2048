import { makeAutoObservable } from 'mobx';

class RootState {
  score = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public addScore(score: number): void {
    this.score += score;
  }
}

export default RootState;
