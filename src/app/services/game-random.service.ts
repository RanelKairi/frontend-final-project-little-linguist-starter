import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { TranslatedWord } from '../../shared/model/translated-word';
import { Category } from '../../shared/model/category';
@Injectable({
  providedIn: 'root'
})
export class GameRandomService {

  currentWord:TranslatedWord[] = []
  
      ordeRandom(array:TranslatedWord[]):TranslatedWord[]{  //מבלגן הכל בקטע טוב
        const arrayCheck = [...array]
        array.sort(()=>Math.random()-0.5);
       
        for(let i = array.length-1; i > -1 ; i--){
          let origin = array[i].origin.toLocaleLowerCase()
          let z = array[i].origin.split('');       
          z.sort(()=> Math.random()-0.5);
          let shuffledWord = z.join('').toLocaleLowerCase()
          console.log(array)
          if(shuffledWord === origin && origin.length > 1){
            [z[0],z[1]] = [z[1],z[0]];
            shuffledWord = z.join('').toLocaleLowerCase()
          }
          array[i].origin = shuffledWord;
          console.log(array)
            };return array;  
        };
    
  

      }