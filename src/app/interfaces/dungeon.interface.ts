import {DifficultyType} from "./difficulty.type";

export class Dungeon {
  difficulty: DifficultyType;
  explorationProgress: number;
  maxExploration: number;

  constructor(difficulty: DifficultyType, maxExploration: number) {
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
