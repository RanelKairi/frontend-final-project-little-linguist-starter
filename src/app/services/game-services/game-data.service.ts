import { Injectable } from '@angular/core';
import { GameProfile } from '../../../shared/model/games/game-profile';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
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
      'In this game you should fix the order of the letters to the correct order of the word with Timer Running UP!',
      'Games/messy-words'
    ),
    new GameProfile(
      4,
      'Memory-Cards',
      '!~this is a memory cards game, ~WARNING~ not a game for begginers , think you got a good memory? prove it here~! !',
      'Games/memory-cards'
    ),
  ];

  // constructor(private CategoryService: CategoriesService) {}

  list(): GameProfile[] {
    return this.allgames;
  }
  getGameById(gameId: number): GameProfile | undefined {
    return this.allgames.find((game) => game.id === gameId);
  }
}
