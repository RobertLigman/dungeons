import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, Subject, Subscription, takeUntil, timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GameEvent} from '../../common/game-event.interface';
import {Hero} from "../../common/hero.interface";
import {EventService} from '../../common/event/event.service';
import { GameEventType } from '../../common/GameEventType';
import { healPerTick, maxHealth } from 'src/app/common/constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroSubject = new BehaviorSubject<Hero>({
    //todo wydzielic do pliku constants
    health: 100,
    experience: 0,
    potions: 1,
    money: 0,
    heroResting: false
  });
  stopProcess$$ = new Subject<void>();
  hero$ = this.heroSubject.asObservable();
  private restSubscription?: Subscription;
  isHeroDead$: Observable<boolean> = this.hero$.pipe(
    map(hero => hero.health <= 0)
  );

  constructor(private eventService: EventService,private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  startRestingUnderTheSky() {


    timer(0, 1000).pipe(
      tap(() => {
        const hero = this.heroSubject.value;
        if (hero.health < maxHealth) {
          hero.health = Math.min(hero.health + healPerTick, maxHealth);
          this.heroSubject.next({...hero, heroResting: true});
          const eventDescription =  this.translate.instant('hero.eventDescription',{healPerTick});;
          const event = new GameEvent(GameEventType.REST, eventDescription);
          this.eventService.addEvent(event);
        } else {
          const eventDescription = this.translate.instant('hero.fullHealth');
          const event = new GameEvent(GameEventType.REST, eventDescription);
          this.eventService.addEvent(event);
          this.stopResting();
        }
      }),
      takeUntil(this.stopProcess$$)
    ).subscribe();
  }

  stopResting() {
    const hero = this.heroSubject.value;
    this.heroSubject.next({...hero, heroResting: false})
    this.stopProcess$$.next();
  }

  takeDamage(damage: number) {
    const hero = this.heroSubject.value;
    hero.heroResting = false;
    hero.health -= damage;
    if (hero.health < 0) {
      hero.health = 0;
    }
    this.heroSubject.next(hero);

  }
}
