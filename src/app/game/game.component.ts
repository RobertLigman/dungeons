import {Component} from '@angular/core';
import {GameService} from '../services/game.service';
import {Difficulty} from "../interfaces/difficulty";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  vm$ = this.gameService.vm$;

  //currentDungeon?: Dungeon;

  onDifficultySelected(difficulty: Difficulty) {
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
