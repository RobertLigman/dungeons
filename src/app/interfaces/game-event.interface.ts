export interface GameEvent {
  type: 'fight' | 'treasure' | "rest" | "info";
  description: string;
  value?: number;
}
