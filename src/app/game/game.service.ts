import {Injectable} from '@angular/core';
import {combineLatest} from 'rxjs';
import {DungeonService} from './dungeon/dungeon.service';
import {EventService} from '../common/event/event.service';
import {HeroService} from './hero/hero.service';
import {Difficulty} from "../common/difficulty";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  vm$ = combineLatest({
    isInDungeon: this.dungeonService.isInDungeon$,
    hero: this.heroService.hero$,
    events: this.eventService.events$,
    dungeon: this.dungeonService.dungeon$,
    isHeroDead: this.heroService.isHeroDead$
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

  changeDifficulty(difficulty: Difficulty) {
    this.dungeonService.changeDifficulty(difficulty);
  }
}
