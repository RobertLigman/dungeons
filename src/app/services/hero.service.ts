import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GameEvent} from '../interfaces/game-event.interface';
import {Hero} from "../interfaces/hero.interface";
import {EventService} from './event.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroSubject = new BehaviorSubject<Hero>({
    health: 100,
    experience: 0,
    potions: 1,
    money: 0
  });
  hero$ = this.heroSubject.asObservable();

  private restSubscription?: Subscription;

  constructor(private eventService: EventService) {
  }

  startRestingUnderTheSky() {
    console.log("serwis odpoczynek")
    const healPerTick = 5;
    const maxHealth = 100;

    this.restSubscription = timer(0, 1000).pipe(
      tap(() => {
        const hero = this.heroSubject.value;
        if (hero.health < maxHealth) {
          hero.health = Math.min(hero.health + healPerTick, maxHealth);
          this.heroSubject.next(hero);

          const eventDescription = `Odpoczywasz pod gołym niebem i regenerujesz ${healPerTick} punktów zdrowia.`;
          console.log("tutaj");
          const event: GameEvent = {type: 'rest', description: eventDescription};
          this.eventService.addEvent(event);
        } else {
          console.log("koniec odpoczynku");
          this.stopResting();
        }
      })
    ).subscribe();
  }

  stopResting() {
    if (this.restSubscription) {
      this.restSubscription.unsubscribe();
    }
  }

  takeDamage(damage: number) {
    const hero = this.heroSubject.value;
    hero.health -= damage;
    if (hero.health < 0) {
      hero.health = 0;
    }
    this.heroSubject.next(hero);

  }
}
