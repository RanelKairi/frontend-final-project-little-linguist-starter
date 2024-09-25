import { TranslatedWord } from './translated-word';

export class MemoryGameCard {
  // words: TranslatedWord[] = [];
 
  
  
  constructor(
    public word : string,
    public flipped : boolean,
    public matched : boolean,
    public direction : string
  ) {
    // this.words = [];
    // this.direction = '';
    // this.flipped = true || false;
    // this.matched = true || false;
    
  }
}
