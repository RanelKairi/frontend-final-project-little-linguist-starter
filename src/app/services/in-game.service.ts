import { Injectable } from '@angular/core';
import { TranslatedWord } from '../../shared/model/translated-word';

@Injectable({
  providedIn: 'root'
})
export class InGameServiceService {
  progress?:number;
   calculateProgress(wordsLength:number,numSuccess:number,index:number): number {
    const totalWords = wordsLength || 0;
    const guessedWordsRatio = numSuccess / totalWords;
    const categoryProgressRatio = index / totalWords;
     const progress = Math.max(guessedWordsRatio, categoryProgressRatio) * 100;
    return progress;
  }

  

}
