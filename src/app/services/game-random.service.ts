import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { TranslatedWord } from '../../shared/model/translated-word';
import { Category } from '../../shared/model/category';
import { GamePlayed } from '../../shared/model/game-played.';
@Injectable({
  providedIn: 'root'
})
export class GameRandomService {

  gamesPlayed : GamePlayed[] = []
  
  addGamePlayed(gamePlayed:GamePlayed): any{
    
    this.gamesPlayed.push(gamePlayed)
    console.log('from gamesservice',this.gamesPlayed)
    
  }

  currentWord:TranslatedWord[] = []
      setOriginal(array: TranslatedWord[]):TranslatedWord[]{
        const originalArray =[...array]
        return array
      }
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

        getGameDuration(){ // check about it 

        }
    
        

      }