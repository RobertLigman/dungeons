export interface GameEvent {
  type: 'fight' | 'treasure' | "rest";
  description: string;
  value?: number;
}
