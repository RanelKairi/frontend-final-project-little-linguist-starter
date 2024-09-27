export class MemoryGameCard {
  constructor(
    public word: string,
    public flipped: boolean,
    public matched: boolean,
    public direction: string,
    public translation: string
  ) {}
}
