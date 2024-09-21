export class Card {
  constructor(
    public word: string,
    public meaning: string,
    public revealed: boolean = false,
    public matched: boolean = false
  ) {}
}
