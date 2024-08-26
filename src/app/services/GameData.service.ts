import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { CategoriesService } from './categories.service';
import { Category } from '../../shared/model/category';



@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private readonly CATEGORIES_KEY = 'categories';


  private allgames: GameProfile[] = [
    new GameProfile(
      1,
      'Mixed Letters',
      'In this game you should fix the order of the letters to the correct order of the word ',
      'Games/mixedLetters'
    ),
    new GameProfile(
      2,
      'Pair Of Words',
      'In this game you will get a single word in English or Hebrew and you need to choose the correct translated word on the other language  ',
      'Games/PairOfWords'
    ),
    new GameProfile(3, '3mixed', 'fixmix3', 'mixed3'),
  ];
  constructor(private CategoryService : CategoriesService) {}

  list(): GameProfile[] {
    return this.allgames;
  }
  // currentCate? : Category;
  // currentGame? : GameProfile;

  Cate2Game(currentCate:Category,
    // curGame:GameProfile 
    // selectedCate?:Category, selectedGame?:GameProfile
  ){
    // const GamePicked_cate:Array[] = [];
    
  } 

  getCate(CateID:number){
    
  }
  // getGameURL(gameID : number , CateID : number): string {
  //   const game = this.allgames.find(g => g.id === gameID);
  //   if(game){
  //     return `${game.GameURL}/${CateID}`;
  //   }
  //   return '';
  // }
}
