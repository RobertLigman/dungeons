import {EventEmitter, Injectable} from '@angular/core';
import { BehaviorSubject, timer, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {Enemy} from "../interfaces/enemy";
import {GameEvent} from "../interfaces/game-event";
import {Dungeon} from "../interfaces/dungeon";
import {HeroService} from "./hero.service";

@Injectable({
  providedIn: 'root'
})
export class DungeonService {
  private dungeonSubject = new BehaviorSubject<Dungeon>(new Dungeon('easy',100));
  dungeon$ = this.dungeonSubject.asObservable();

  private eventsSubject = new BehaviorSubject<GameEvent[]>([]);
  events$ = this.eventsSubject.asObservable();

  heroTookDamage = new EventEmitter<number>();

  private explorationSubscription?: Subscription;



  exploreDungeon(dungeon: Dungeon) {
    this.dungeonSubject.next(dungeon);

    this.explorationSubscription = timer(0, 1000).pipe(
      tap(() => {
        const chance = Math.random();
        if (chance < 0.4) {
          this.triggerFight();
        } else if (chance < 0.8) {
          this.triggerTreasure();
        }
        dungeon.increaseProgress(chance*10);
      })
    ).subscribe();
  }

  addEvent(event: GameEvent) {
    console.log("event");
    this.eventsSubject.next([...this.eventsSubject.value, event]);
  }

  private triggerFight() {
    const enemy: Enemy = {
      name: 'Goblin',
      health: 30,
      damage: 5
    };
    const damage = enemy.damage;
    const event: GameEvent = {
      type: 'fight',
      description: `Walczysz z ${enemy.name} i otrzymujesz ${damage} obrażeń!`
    };
    this.eventsSubject.next([...this.eventsSubject.value, event]);
    this.heroTookDamage.emit(damage);
  }

  private triggerTreasure() {
    const money = Math.floor(Math.random() * 50) + 10;
    const event: GameEvent = {
      type: 'treasure',
      description: `Znalazłeś skrzynię z ${money} złotymi!`,
      value: money
    };
    this.eventsSubject.next([...this.eventsSubject.value, event]);
  }

  stopExploration() {
    if (this.explorationSubscription) {
      this.explorationSubscription.unsubscribe();
    }
  }

}
