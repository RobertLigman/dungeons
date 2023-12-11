import { GameEventType } from "./GameEventType";

export class GameEvent {
  type: GameEventType;
  description: string;
  money?: number;


  constructor(type: GameEventType, description: string, money?: number) {
    this.type = type;
    this.description = description;
    this.money = money;
  }
}
