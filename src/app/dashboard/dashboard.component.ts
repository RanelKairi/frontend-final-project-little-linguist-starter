import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameResult } from '../../shared/model/game-result.';
import { GameResultsService } from '../services/game-results.service';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../shared/model/category';
import { CatesService } from '../services/cates.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameDataService } from '../services/game-data.service';
import { GameProfile } from '../../shared/model/game-profile';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
// amood habait
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  gameResults: GameResult[] = []; // Game history of the current player
  categoriesLearned: number = 0;
  categoriesLearnedANY: any;
  categoriesNotLearned: number = 0;
  isLoading = true;
  // Stats to display in cards
  totalPoints: number = 0;
  gamesPlayed: number = 0;
  highestAvgScore: number = 0;
  lowestAvgScore: number = 0;
  highestAvgScoreGame?: GameProfile;
  lowestAvgScoreGame?: GameProfile;
  perfectGamesPercentage: number = 0;
  mostPlayedCategory: string = '';
  mostPlayed: Category | undefined;
  categoriesStudiedPercentage: number = 0;
  // highestAvg:number = 0;
  // New variables for the monthly challenge and strike days
  gamesThisMonth: number = 0; // Number of games played this month
  challengeMessage: string = ''; // Message for the monthly challenge
  daysStreak: number = 0; // Number of consecutive days the user has played
  maxCount: number = 0;
  constructor(
    private gameResultsService: GameResultsService,
    private cateService: CatesService,
    private gameDataService: GameDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.gameResults = await this.gameResultsService.list();
    console.log(this.gameResults);

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
    console.log(this.gamesPlayed);

    // Calculate total points
    this.totalPoints = this.gameResults.reduce(
      (sum, result) => sum + result.points,
      0
    );

    // Calculate average scores by game type
    const gameTypeScores = this.calculateGameTypeScores();
    this.highestAvgScoreGame = this.getHighestAvgScoreGame(gameTypeScores);
    this.lowestAvgScoreGame = this.getLowestAvgScoreGame(gameTypeScores);

    // Calculate percentage of perfect games (100 points)
    const perfectGames = this.gameResults.filter(
      (result) => result.points === 100
    );
    if (perfectGames.length == 0) {
      console.log('user without perfect games case handled');
      this.perfectGamesPercentage = 0;
    } else {
      this.perfectGamesPercentage = Math.round(
        (perfectGames.length / this.gamesPlayed) * 100
      );
    }
    // Find the most played category
    this.mostPlayedCategory = this.calculateMostPlayedCategory();
    if (this.mostPlayedCategory) {
      this.loadMostCategory();
    } else {
      this.mostPlayedCategory === 'you didnt play yet!';
    }
  }

  async loadMostCategory(): Promise<void> {
    this.mostPlayed = await this.cateService.get(this.mostPlayedCategory);
    console.log(this.mostPlayed);
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

  getHighestAvgScoreGame(gameTypeScores: {
    [gameType: string]: number[];
  }): GameProfile | undefined {
    let highestAvgGame: GameProfile | undefined;
    let highestAvg = 0;

    for (const gameId in gameTypeScores) {
      const scores = gameTypeScores[gameId];
      console.log(scores);
      console.log(scores.length);
      const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;

      if (avg > highestAvg) {
        highestAvg = avg;
        this.highestAvgScore = Math.floor(avg);
        highestAvgGame = this.gameDataService.getGameById(parseInt(gameId));
      }
    }

    return highestAvgGame;
  }

  getLowestAvgScoreGame(gameTypeScores: {
    [gameType: string]: number[];
  }): GameProfile | undefined {
    let lowestAvgGame: GameProfile | undefined;
    let lowestAvg = 100; // Max points is 100, so start from that

    for (const gameId in gameTypeScores) {
      const scores = gameTypeScores[gameId];
      const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;

      if (avg < lowestAvg) {
        lowestAvg = avg;
        this.lowestAvgScore = Math.floor(avg);
        lowestAvgGame = this.gameDataService.getGameById(parseInt(gameId));
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
      console.log(categoryCounts);
      if (categoryCounts[categoryId] > maxCount) {
        maxCount = categoryCounts[categoryId];
        mostPlayedCategory = categoryId;
      }
      console.log('after', categoryCounts);
      console.log(maxCount);
    }
    console.log(maxCount);
    this.maxCount = maxCount;

    return mostPlayedCategory;
  }

  calculateCategoryStats(allCategories: Category[]): void {
    // Calculate categories learned
    this.categoriesLearned = new Set(
      this.gameResults.map((result) => result.categoryId)
    ).size;
    if (allCategories)
      // this.categoriesLearnedANY = new Set(this.gameResults.map(result => result.categoryId));
      // console.log(this.categoriesLearnedANY)

      console.log('categoriesLearned', this.categoriesLearned);
    // Calculate categories not learned
    this.categoriesNotLearned = allCategories.length - this.categoriesLearned;

    // Calculate percentage of categories studied
    this.categoriesStudiedPercentage =
      (this.categoriesLearned / allCategories.length) * 100;
  }

  calculateMonthlyChallenge(): void {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter games played after the first day of the current month
    const gamesThisMonth = this.gameResults.filter(
      (result) => result.date >= firstDayOfMonth
    );

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
      currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day

      // Check if any games were played on this day
      const gamesOnDate = this.gameResults.filter(
        (result) =>
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
    this.isLoading = false;
  }
}
