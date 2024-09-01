import { Injectable } from '@angular/core';
import { GameScoreData } from '../../shared/model/game-score-data.';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private lastGameScore ?:GameScoreData
  setScore(data:GameScoreData):void{

    this.lastGameScore = data;

  }
  
  getScore():GameScoreData | undefined{


    return this.lastGameScore;
  }

}
