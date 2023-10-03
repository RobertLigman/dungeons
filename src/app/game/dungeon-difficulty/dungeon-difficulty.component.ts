import {Component, EventEmitter, Output} from '@angular/core';
import {DifficultyType} from "../../interfaces/difficulty.type";

@Component({
  selector: 'app-dungeon-difficulty',
  templateUrl: './dungeon-difficulty.component.html',
  styleUrls: ['./dungeon-difficulty.component.css']
})
export class DungeonDifficultyComponent {
  @Output() difficultySelected = new EventEmitter<DifficultyType>();

  selectDifficulty(difficulty: DifficultyType) {
    this.difficultySelected.emit(difficulty);
  }
}
