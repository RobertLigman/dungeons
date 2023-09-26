import { Component } from '@angular/core';
import {DungeonService} from "../services/dungeon.service";
import {HeroService} from "../services/hero.service";
import {Hero} from "../interfaces/hero";
import {GameEvent} from "../interfaces/game-event";
import {Dungeon} from "../interfaces/dungeon";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  inDungeon = false;
  hero: Hero | null = null;
  events: GameEvent[] = [];

  constructor(private heroService: HeroService, private dungeonService: DungeonService) {
    this.heroService.hero$.subscribe(hero => this.hero = hero);
    this.dungeonService.events$.subscribe(events => this.events = events);
  }

  startDungeonExploration() {
    const dungeon = new Dungeon('easy', 100);
    this.inDungeon = true;
    this.dungeonService.exploreDungeon(dungeon);
  }

  leaveDungeon() {
    this.dungeonService.stopExploration();
    this.inDungeon = false;

  }

  restUnderTheSky() {
    console.log("Start resting")
    this.heroService.startRestingUnderTheSky();
  }

  stopResting() {
    this.heroService.stopResting();
  }

  protected readonly Dungeon = Dungeon;
}
