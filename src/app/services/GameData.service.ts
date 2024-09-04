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
