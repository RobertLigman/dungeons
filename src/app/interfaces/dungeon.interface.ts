import {Difficulty} from "./difficulty";

export class Dungeon {
  difficulty: Difficulty;
  explorationProgress: number;
  maxExploration: number;

  constructor(difficulty: Difficulty, maxExploration: number) {
    this.difficulty = difficulty;
    this.explorationProgress = 0;
    this.maxExploration = maxExploration;
  }

  increaseProgress(amount: number) {
    this.explorationProgress += amount;
    if (this.explorationProgress > this.maxExploration) {
      this.explorationProgress = this.maxExploration;
    }
  }

  isFullyExplored(): boolean {
    return this.explorationProgress >= this.maxExploration;
  }
}
