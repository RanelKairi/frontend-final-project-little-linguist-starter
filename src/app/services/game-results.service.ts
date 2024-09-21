import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, QuerySnapshot, Timestamp } from '@angular/fire/firestore';
import { GameResult } from '../../shared/model/game-result.';

@Injectable({
  providedIn: 'root',
})
export class GameResultsService {
  constructor(private firestore: Firestore) {}

  // Add a new game result to Firestore
  async addGameResult(gameResult: GameResult): Promise<void> {
    const gameResultsCollection = collection(this.firestore, 'gameResults');
    await addDoc(gameResultsCollection, {
      categoryId: gameResult.categoryId,
      gameId: gameResult.gameId,
      date: Timestamp.fromDate(gameResult.date),  // Convert Date to Timestamp
      points: gameResult.points,
    });
    console.log('New game result added to Firestore', gameResult);
  }
  // Fetch the list of game results from Firestore
  async list(): Promise<GameResult[]> {
    const gameResultsCollection = collection(this.firestore, 'gameResults');
    const querySnapshot: QuerySnapshot = await getDocs(gameResultsCollection);
  
    return querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return new GameResult(
        data['categoryId'],
        data['gameId'],
        (data['date'] as Timestamp).toDate(),  // Convert Timestamp to Date
        data['points']
      );
    });
  }
}