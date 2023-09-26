import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Hero} from "../interfaces/hero";
import {DungeonService} from "./dungeon.service";

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

  constructor(private dungeonService: DungeonService) {
    this.dungeonService.heroTookDamage.subscribe(damage => {
      this.takeDamage(damage);
    });
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
          this.dungeonService.addEvent({ type: 'rest', description: eventDescription });
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
