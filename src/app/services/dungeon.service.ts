import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Enemy} from "../interfaces/enemy.interface";
import {GameEvent} from "../interfaces/game-event.interface";
import {Dungeon} from "../interfaces/dungeon.interface";
import {HeroService} from "./hero.service";
import {EventService} from './event.service';
import {DifficultyType} from "../interfaces/difficulty.type";

@Injectable({
  providedIn: 'root'
})
export class DungeonService {

  private difficulty$$ = new BehaviorSubject<DifficultyType>('easy');
  private dungeon$$ = new BehaviorSubject<Dungeon>(new Dungeon(this.difficulty$$.value, 100));
  private isInDungeon$$ = new BehaviorSubject<Boolean>(false);

  private explorationSubscription?: Subscription;

  constructor(private heroService: HeroService, private eventService: EventService) {
  }

  get dungeon$() {
    return this.dungeon$$.asObservable();
  }


  get isInDungeon$() {
    return this.isInDungeon$$.asObservable();
  }

  startDungeonExploration() {
    const dungeon = new Dungeon(this.difficulty$$.value, 100);
    this.isInDungeon$$.next(true);
    this.exploreDungeon(dungeon);
  }

  private getDifficultyIndicator(): number {
    switch (this.difficulty$$.value) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return 4;
      default:
        return 1;
    }
  }

  exploreDungeon(dungeon: Dungeon) {
    if (this.isHeroDead()) {
      this.stopExploration();
      console.log("Musisz się uleczyć");
      return;
    }
    this.dungeon$$.next(dungeon);

    this.explorationSubscription = timer(0, 1000).pipe(
      tap(() => {
        if (this.dungeon$$.value.explorationProgress >= 100 || this.isHeroDead()) this.stopExploration();
        const chance = Math.random();
        if (chance <= 0.5) {
          this.triggerFight();
        } else if (chance <= 1) {
          this.triggerTreasure();
        }
        dungeon.increaseProgress(chance * 10);
      })
    ).subscribe();
  }

  private isHeroDead() {
    let heroHp = 0;
    this.heroService.hero$.subscribe(hero => heroHp = hero.health);
    return heroHp <= 0;
  }


  private triggerFight() {
    const enemy: Enemy = {
      name: 'Goblin',
      health: 30,
      damage: 5 * this.getDifficultyIndicator()
    };
    const damage = enemy.damage;
    const event: GameEvent = {
      type: 'fight',
      description: `Walczysz z ${enemy.name} i otrzymujesz ${damage} obrażeń!`
    };
    this.eventService.addEvent(event)
    this.heroService.takeDamage(damage);
  }

  private triggerTreasure() {
    const money = Math.floor(Math.random() * 50) + 10;
    const event: GameEvent = {
      type: 'treasure',
      description: `Znalazłeś skrzynię z ${money} złotymi!`,
      value: money
    };
    this.eventService.addEvent(event);
  }

  stopExploration() {
    if (this.explorationSubscription) {
      this.isInDungeon$$.next(false);
      this.explorationSubscription.unsubscribe();
    }
  }

  changeDifficulty(difficulty: DifficultyType) {
    this.difficulty$$.next(difficulty);
  }
}
