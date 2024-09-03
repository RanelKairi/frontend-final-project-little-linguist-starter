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
    new GameProfile(3, 'mixdrix', 'thisgame is dangoururs', 'Games/mix-drix'),

    new GameProfile(
      4,
      'mix-3-try',
      'thisgame is dangoururs',
      'Games/mix-3-try'
    ),

    new GameProfile(
      5,
      'Mixxed Letters FIN',
      'In this game you should fix the order of the letters to the correct order of the word ',
      'Games/mixxed-letters'
    ),
  ];

  constructor(private CategoryService: CategoriesService) {}

  list(): GameProfile[] {
    return this.allgames;
  }
  // currentCate? : Category;
  // currentGame? : GameProfile;

  Cate2Game(
    currentCate: Category
    
  ) {
  }

  getCate(CateID: number) {}
 
}
