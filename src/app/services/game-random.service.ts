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
  };
  shuffleArray2(array: TranslatedWord[]): TranslatedWord[] {
    array.sort(() => Math.random()-0.5)// רק 1 
    return array;
  };
  shuffleArray3(array:any):any {
    const checkArray = array;
    console.log('checkArray',checkArray,'array',array) 
    array.sort(() => Math.random()-0.5)// רק 1 
    // console.log("array after sort",array)
    if(checkArray.join('') === array.join('')){
      array.sort(() => Math.random()-0.5)// רק 1 
      // console.log("array after sort2Check",array)
    };
    return array;
  };

  shuffleArrayGem(array : string[]): string[]{
    const arrayCopy = [...array];

    // אלגוריתם פישר-יאטס לערבוב מערך
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    // בודק אם המערך החדש שונה מהמקורי
    if (JSON.stringify(arrayCopy) === JSON.stringify(array)) {
      // אם זהה, מבצע ערבוב נוסף
      return this.shuffleArrayGem(arrayCopy);
    } else {
      return arrayCopy;
    }
  }

  }

 // array to string
 //string to array of characthers