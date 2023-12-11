import {Component, EventEmitter, Output} from '@angular/core';
import {Difficulty} from "../../../common/difficulty";

@Component({
  selector: 'app-dungeon-difficulty',
  templateUrl: './dungeon-difficulty.component.html',
  styleUrls: ['./dungeon-difficulty.component.css']
})
export class DungeonDifficultyComponent {
  protected readonly Difficulty = Difficulty;

  @Output() difficultySelected = new EventEmitter<Difficulty>();

  selectDifficulty(difficulty: Difficulty) {
    this.difficultySelected.emit(difficulty);
  }


}
