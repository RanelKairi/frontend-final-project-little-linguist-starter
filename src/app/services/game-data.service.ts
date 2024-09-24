import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { CategoriesService } from './categories.service';
import { Category } from '../../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private readonly CATEGORIES_KEY = 'categories';
  allCateGames : GameProfile[] = []
  private allgames: GameProfile[] = [
    new GameProfile(
      1,
      'Mixed Letters - ',
      'In this game you should fix the order of the letters to the correct order of the word ',
      'Games/mixxed-letters'
    ),
    new GameProfile(
      2,
      'Word Sorting',
      'In this game you need to match a word to a category',
      'Games/word-sorting'
    ),
    new GameProfile(
      3,
      'Messy Words',
      'In this game you should fix the order of the letters to the correct order of the word',
      'Games/messy-words'
    ),
    new GameProfile(
      4,
      'Reversed Cards',
      'In this game you should fix the order of the letters to the correct order of the word',
      'Games/reversed-cards'
    ),
    new GameProfile(
      5,
      'Cards-Matching',
      'this is a memory game !',
      'Games/card-matching'
    ),
  ];

  constructor(private CategoryService: CategoriesService) {}

  list(): GameProfile[] {
    return this.allgames;
  }
  // currentCate? : Category;
  // currentGame? : GameProfile;

  Cate2Game(currentCate: Category) {}

  getCate(CateID: number) {}

  getGameById(gameId:number):GameProfile | undefined{
    return this.allgames.find((game) => game.id === gameId)
  }
  getGamesByCateId():GameProfile[] {

    return this.allCateGames
  }
}
