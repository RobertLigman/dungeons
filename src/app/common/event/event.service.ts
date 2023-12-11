import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GameEvent} from '../game-event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events$$ = new BehaviorSubject<GameEvent[]>([]);

  get events$() {
    return this.events$$.asObservable();
  }


  addEvent(event: GameEvent) {
    this.events$$.next([event, ...this.events$$.value]);
  }
}
