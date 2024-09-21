import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameResult } from '../../shared/model/game-result.';
import { GameResultsService } from '../services/game-results.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { CatesService } from '../services/cates.service';
// amood habait
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,MatIconModule,MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit{
  gameResults: GameResult[] = [];  // Game history of the current player
  categoriesLearned: number = 0;
  categoriesNotLearned: number = 0;
  
  // Stats to display in cards
  totalPoints: number = 0;
  gamesPlayed: number = 0;
  highestAvgScoreGame: string = '';
  lowestAvgScoreGame: string = '';
  perfectGamesPercentage: number = 0;
  mostPlayedCategory: string = '';
  categoriesStudiedPercentage: number = 0;

  // New variables for the monthly challenge and strike days
  gamesThisMonth: number = 0;       // Number of games played this month
  challengeMessage: string = '';    // Message for the monthly challenge
  daysStreak: number = 0;           // Number of consecutive days the user has played
  constructor(
    private gameResultsService: GameResultsService,
    private cateService: CatesService  // Get category data
  ) {}

  async ngOnInit(): Promise<void> {
    this.gameResults = await this.gameResultsService.list();
    console.log(this.gameResults)
  
    // Calculate stats for dashboard
    this.calculateStats();
  
    // Get categories data
    const allCategories = await this.cateService.list();
    this.calculateCategoryStats(allCategories);
  
    // Calculate monthly challenge progress
    this.calculateMonthlyChallenge();
  
    // Calculate consecutive strike days
    this.calculateStrikeDays();
  }

  calculateStats(): void {
    this.gamesPlayed = this.gameResults.length;
    console.log(this.gamesPlayed)

    // Calculate total points
    this.totalPoints = this.gameResults.reduce((sum, result) => sum + result.points, 0);

    // Calculate average scores by game type
    const gameTypeScores = this.calculateGameTypeScores();
    this.highestAvgScoreGame = this.getHighestAvgScoreGame(gameTypeScores);
    this.lowestAvgScoreGame = this.getLowestAvgScoreGame(gameTypeScores);

    // Calculate percentage of perfect games (100 points)
    const perfectGames = this.gameResults.filter(result => result.points === 100);
    this.perfectGamesPercentage = (perfectGames.length / this.gamesPlayed) * 100;

    // Find the most played category
    this.mostPlayedCategory = this.calculateMostPlayedCategory();
  }

  calculateGameTypeScores(): { [gameType: string]: number[] } {
    const gameTypeScores: { [gameType: string]: number[] } = {};
    
    // Group scores by game type
    for (const result of this.gameResults) {
      if (!gameTypeScores[result.gameId]) {
        gameTypeScores[result.gameId] = [];
      }
      gameTypeScores[result.gameId].push(result.points);
    }

    return gameTypeScores;
  }

  getHighestAvgScoreGame(gameTypeScores: { [gameType: string]: number[] }): string {
    let highestAvgGame = '';
    let highestAvg = 0;

    for (const gameId in gameTypeScores) {
      const scores = gameTypeScores[gameId];
      const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;

      if (avg > highestAvg) {
        highestAvg = avg;
        highestAvgGame = gameId;
      }
    }

    return highestAvgGame;
  }

  getLowestAvgScoreGame(gameTypeScores: { [gameType: string]: number[] }): string {
    let lowestAvgGame = '';
    let lowestAvg = 100;  // Max points is 100, so start from that

    for (const gameId in gameTypeScores) {
      const scores = gameTypeScores[gameId];
      const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;

      if (avg < lowestAvg) {
        lowestAvg = avg;
        lowestAvgGame = gameId;
      }
    }

    return lowestAvgGame;
  }

  calculateMostPlayedCategory(): string {
    const categoryCounts: { [categoryId: string]: number } = {};

    for (const result of this.gameResults) {
      if (!categoryCounts[result.categoryId]) {
        categoryCounts[result.categoryId] = 0;
      }
      categoryCounts[result.categoryId]++;
    }

    let mostPlayedCategory = '';
    let maxCount = 0;

    for (const categoryId in categoryCounts) {
      if (categoryCounts[categoryId] > maxCount) {
        maxCount = categoryCounts[categoryId];
        mostPlayedCategory = categoryId;
      }
    }

    return mostPlayedCategory;
  }

  calculateCategoryStats(allCategories: Category[]): void {
    // Calculate categories learned
    this.categoriesLearned = new Set(this.gameResults.map(result => result.categoryId)).size;

    // Calculate categories not learned
    this.categoriesNotLearned = allCategories.length - this.categoriesLearned;

    // Calculate percentage of categories studied
    this.categoriesStudiedPercentage = (this.categoriesLearned / allCategories.length) * 100;
  }

  calculateMonthlyChallenge(): void {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
    // Filter games played after the first day of the current month
    const gamesThisMonth = this.gameResults.filter(result => result.date >= firstDayOfMonth);
  
    // Number of games played this month
    this.gamesThisMonth = gamesThisMonth.length;
  
    // Determine if the challenge has been met
    const gamesLeftToPlay = 20 - this.gamesThisMonth;
    if (gamesLeftToPlay > 0) {
      this.challengeMessage = `Play ${gamesLeftToPlay} more games to complete this month's challenge!`;
    } else {
      this.challengeMessage = `Congratulations! You've completed this month's challenge! 🎉`;
    }
  }

  calculateStrikeDays(): void {
    let strikeDays = 0;
    let currentDate = new Date();
  
    // Loop through each previous day until no games are found
    while (true) {
      currentDate.setDate(currentDate.getDate() - 1);  // Move to the previous day
  
      // Check if any games were played on this day
      const gamesOnDate = this.gameResults.filter(result =>
        new Date(result.date).toDateString() === currentDate.toDateString()
      );
  
      // If no games were played on this day, stop counting
      if (gamesOnDate.length === 0) {
        break;
      }
  
      // Increment the strike day counter if games were played
      strikeDays++;
    }
  
    this.daysStreak = strikeDays;
  }
  
  

}
  
 
