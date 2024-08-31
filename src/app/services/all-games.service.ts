import { Injectable } from '@angular/core';
import { GamePlayed } from '../../shared/model/game-played.';

@Injectable({
  providedIn: 'root'
})
export class AllGamesService {

  private readonly GAMES_KEY = 'games';
  private readonly NEXT_ID_KEY = 'nextId';
  
  private getGamesPlayed() : Map<number, GamePlayed>{
    const gamesString = localStorage.getItem(this.GAMES_KEY);

    if (!gamesString) {
      return new Map<number, GamePlayed>();
    } else {
      return new Map<number, GamePlayed>(JSON.parse(gamesString));
    }
  }

  private getNextId() : number {
    const nextIdString = localStorage.getItem(this.NEXT_ID_KEY); 

    return nextIdString ? parseInt(nextIdString) : 0;
  }

  private setGamesPlayed(list : Map<number, GamePlayed>) : void {
    localStorage.setItem(this.GAMES_KEY, JSON.stringify(Array.from(list)));
  }

  private setNextId(id : number) : void {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  list() : GamePlayed[] {
    return Array.from(this.getGamesPlayed().values());
  }

  get(id : number) : GamePlayed | undefined {
    return this.getGamesPlayed().get(id);
  }

  delete(id : number) : void {
    const gamesMap = this.getGamesPlayed();
    gamesMap.delete(id);
    this.setGamesPlayed(gamesMap);
  }

  update(game : GamePlayed) : void {
    const gamesMap = this.getGamesPlayed();

    game.secondsLeftInGame =+ //new Date();
    gamesMap.set(game.idCategory,game);

    this.setGamesPlayed(gamesMap);
}
add(game : GamePlayed) : void {
  game.idCategory = this.getNextId();
  // category.lastUpdateDate = new Date();

  const gamesMap = this.getGamesPlayed();
  gamesMap.set(game.idCategory, game);

  this.setGamesPlayed(gamesMap);
  this.setNextId(++game.gamePlayedId);
}

}
