import {Component} from '@angular/core';
import {GameService} from '../services/game.service';
import {DifficultyType} from "../interfaces/difficulty.type";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  vm$ = this.gameService.vm$;

  //currentDungeon?: Dungeon;

  onDifficultySelected(difficulty: DifficultyType) {
    this.gameService.changeDifficulty(difficulty);
  }


  constructor(private gameService: GameService) {
  }

  startDungeonExploration() {
    this.gameService.startDungeonExploration();
  }

  leaveDungeon() {
    this.gameService.leaveDungeon();

  }

  restUnderTheSky() {
    this.gameService.restUnderTheSky();
  }

  stopResting() {
    this.gameService.stopResting();
  }
}
