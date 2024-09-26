import { TranslatedWord } from '../categories/translated-word';

export class MemoryGameCard {
  // words: TranslatedWord[] = [];

  constructor(
    public word: string,
    public flipped: boolean,
    public matched: boolean,
    public direction: string,
    public translation: string
  ) {
    // this.words = [];
  }
}
