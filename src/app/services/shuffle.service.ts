import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShuffleService {

  shuffleWord(word: string): string {
    const letters = word.split('');
    // אלגוריתם פישר-יאטס לערבוב מערך
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');   

  }

  shuffleArray(array : any) : any {
    return array
  }

}
