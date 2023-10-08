import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, filter, finalize, map, of, Subject, switchMap, takeUntil, timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Enemy} from "../interfaces/enemy.interface";
import {GameEvent} from "../interfaces/game-event.interface";
import {Dungeon} from "../interfaces/dungeon.interface";
import {HeroService} from "./hero.service";
import {EventService} from './event.service';
import {Difficulty} from "../interfaces/difficulty";

@Injectable({
  providedIn: 'root'
})
export class DungeonService {

  private difficulty$$ = new BehaviorSubject<Difficulty>(Difficulty.EASY);
  private dungeon$$ = new BehaviorSubject<Dungeon>(new Dungeon(this.difficulty$$.value, 100));
  private isInDungeon$$ = new BehaviorSubject<Boolean>(false);
  private triggerStopExploration$$ = new Subject<void>();
  private dungeonPerks$$ = new BehaviorSubject<{ experience: number, gold: number }>({experience: 0, gold: 0})
  // private explorationSubscription?: Subscription;

  // private isHeroDead() {
  //   let heroHp = 0;
  //   this.heroService.hero$.subscribe(hero => heroHp = hero.health);
  //   return heroHp <= 0;
  // }

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
      case Difficulty.EASY:
        return 1;
      case Difficulty.MEDIUM:
        return 2;
      case Difficulty.HARD:
        return 4;
      default:
        return 1;
    }
  }

  explorationProgress$ = this.dungeon$$.pipe(
    filter(dungeon => dungeon.explorationProgress >= 100)
  );

  exploreDungeon(dungeon: Dungeon) {
    // if (this.isHeroDead$) {
    //   this.stopExploration();
    //   console.log("Musisz się uleczyć");
    //   return;
    // }
    this.dungeon$$.next(dungeon);

    // this.explorationSubscription = timer(0, 1000).pipe(
    timer(0, 1000).pipe(
      tap(() => {
        let money = 0;
        this.explorationProgress$.subscribe(() => {
          this.stopExploration();
        });
        const chance = Math.random();
        if (chance <= 0.5) {
          this.triggerFight();
        } else if (chance <= 1) {
          money = this.triggerTreasure();
        }
        dungeon.increaseProgress(chance * 10);
        this.dungeonPerks$$.next({
          experience: this.dungeonPerks$$.value.experience + 10,
          gold: this.dungeonPerks$$.value.gold + money
        })
      }),
      switchMap(() => this.heroService.isHeroDead$.pipe(filter(Boolean), tap(() => {
        console.log("Cokolwiek")
        this.stopExploration()
      }))),
      takeUntil(this.triggerStopExploration$$),
      finalize(() => console.log("zamykanie"))
    ).subscribe();
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

  private triggerTreasure(): number {
    const money = Math.floor(Math.random() * 50) + 10;
    const event: GameEvent = {
      type: 'treasure',
      description: `Znalazłeś skrzynię z ${money} złotymi!`,
      value: money
    };
    this.eventService.addEvent(event);
    return money;
  }

  stopExploration() {

    if (this.isInDungeon$$.value) {
      this.heroService.hero$.pipe(
        switchMap(hero => {
          hero.money += this.dungeonPerks$$.value.gold;
          hero.experience += this.dungeonPerks$$.value.experience;
          return of(hero);
        })).subscribe(updatedHero => {
        console.log(updatedHero);
      });
      let event: GameEvent;
      combineLatest([
        this.heroService.hero$,
        this.heroService.hero$.pipe(map(hero => hero.experience.toString()))
      ]).pipe(
        map(([hero, experience]) => {
          event = {
            type: 'info',
            description: `zdobyłeś ${hero.money} pieniędzy oraz ${experience} doświadczenia`,
          };
          return event;
        })).subscribe(result => this.eventService.addEvent(result));

      this.isInDungeon$$.next(false);
      this.triggerStopExploration$$.next();
      // this.explorationSubscription.unsubscribe();
    }
  }

  changeDifficulty(difficulty: Difficulty) {
    this.difficulty$$.next(difficulty);
  }
}
