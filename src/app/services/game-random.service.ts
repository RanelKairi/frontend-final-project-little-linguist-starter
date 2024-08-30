import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { TranslatedWord } from '../../shared/model/translated-word';
import { Category } from '../../shared/model/category';
@Injectable({
  providedIn: 'root'
})
export class GameRandomService {

  currentWord:TranslatedWord[] = []

  shuffleArray2(array: TranslatedWord[]): TranslatedWord[] {
    array.sort(() => Math.random()-0.5)
    array[0].origin.split('')
    console.log('kAkA',array[0].origin)
    // רק 1 
    return array;
  };

  sshuffleArrayGem(array : TranslatedWord[]):TranslatedWord[]{
    

    // אלגוריתם פישר-יאטס לערבוב מערך
    for (let i = array.length - 1; i > 0; i--) {
      let nextword = array[i].origin.split('')
      console.log('nextword',nextword)
    nextword.sort(()=> Math.random()-0.5)
    console.log('nextwordSORT',nextword)
    nextword.toLocaleString()
    console.log('nextwordLOCALOESTRING',nextword)
    }
    // בודק אם המערך החדש שונה מהמקורי
    
      return array;
    }

    ordeRandom(array:TranslatedWord[]):TranslatedWord[]{  //מבלגן הכל בקטע טוב
      const arrayCheck = [...array]
      array.sort(()=>Math.random()-0.5);
      console.log('mixdrixArray',array)
      for(let i = array.length-1; i > 0 ; i--){
        let z = array[i].origin.split('')
        console.log('z',z)
        console.log('array[i]',array[i].origin)
        z.sort(()=> Math.random()-0.5)
        console.log('z.sort()=>',z)
        array[i].origin = z.join('')
        console.log('zjoin=>arrayback',array[i].origin)
        console.log('array',array)
      
        if(JSON.stringify(array[i].origin) === JSON.stringify(arrayCheck[i].origin)){
          return this.ordeRandom(array)
        };

          };return array;  
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
  shuffleArray9(array: TranslatedWord[]): TranslatedWord[] {
    const origin  = array[0].origin
    for (let i = array.length - 1; i > 0; i--){
      console.log("forforfor9",array[i])
    array.sort(() => Math.random()-0.5)// רק 1 
    }
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

  

  }

 // array to string
 //string to array of characthers