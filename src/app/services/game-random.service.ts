import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { TranslatedWord } from '../../shared/model/translated-word';
import { Category } from '../../shared/model/category';
@Injectable({
  providedIn: 'root'
})
export class GameRandomService {
  shuffleArray(array: TranslatedWord[]): TranslatedWord[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  }
  shuffleArray2(array: TranslatedWord[]): TranslatedWord[] {
    array.sort(() => Math.random()-0.5)// רק 1 
    return array;
  }
  shuffleArray3(array:any):any {
    array.sort(() => Math.random()-0.5)
    return array;
  }

  shuffleWord2(word:string): string {
    
    //  word.sort(()=> Math.random()-0.5)
    return word
  }
}
//   shuffleWord(array:any): string {
// array 
//     console.log("servce"+characters.join(''))
//     return characters.join('');
//   }
// }
 // array to string
 //string to array of characthers