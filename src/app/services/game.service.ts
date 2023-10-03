import {Injectable} from '@angular/core';
import {combineLatest} from 'rxjs';
import {DungeonService} from './dungeon.service';
import {EventService} from './event.service';
import {HeroService} from './hero.service';
import {DifficultyType} from "../interfaces/difficulty.type";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  vm$ = combineLatest({
    isInDungeon: this.dungeonService.isInDungeon$,
    hero: this.heroService.hero$,
    events: this.eventService.events$,
    dungeon: this.dungeonService.dungeon$
  })

  constructor(private heroService: HeroService, private dungeonService: DungeonService, private eventService: EventService) {
  }

  stopResting() {
    this.heroService.stopResting();
  }

  restUnderTheSky() {
    this.heroService.startRestingUnderTheSky();
  }


  startDungeonExploration() {
    this.dungeonService.startDungeonExploration();
  }

  leaveDungeon() {
    this.dungeonService.stopExploration();
  }

  changeDifficulty(difficulty: DifficultyType) {
    this.dungeonService.changeDifficulty(difficulty);
  }
}
