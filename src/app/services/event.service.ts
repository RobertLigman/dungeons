import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GameEvent} from '../interfaces/game-event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events$$ = new BehaviorSubject<GameEvent[]>([]);

  get events$() {

    return this.events$$.asObservable();
  }

  constructor() {
  }

  addEvent(event: GameEvent) {
    console.log("event");
    this.events$$.next([...this.events$$.value, event]);
  }
}
