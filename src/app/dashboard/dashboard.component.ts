import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameResult } from '../../shared/model/games/game-result.';
import { GameResultsService } from '../services/game-services/game-results.service';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../shared/model/categories/category';
import { CatesService } from '../services/category-services/category.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameDataService } from '../services/game-services/game-data.service';
import { GameProfile } from '../../shared/model/games/game-profile';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

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
})
export class DashboardComponent implements OnInit {
  gameResults: GameResult[] = [];
  isLoading = true;

  // Stats to display in cards
  categoriesNotLearned: number = 0;
  categoriesLearned: number = 0;
  totalPoints: number = 0;
  gamesPlayed: number = 0;
  highestAvgScore: number = 0;
  lowestAvgScore: number = 0;
  highestAvgScoreGame?: GameProfile;
  lowestAvgScoreGame?: GameProfile;
  perfectGamesPercentage: number = 0;
  mostPlayedCategory: string = '';
  mostPlayed?: Category;
  categoriesStudiedPercentage: number = 0;

  // monthly and streak vars:
  gamesThisMonth: number = 0;
  challengeMessage: string = '';
  daysStreak: number = 0;
  maxCount: number = 0;

  constructor(
    private gameResultsService: GameResultsService,
    private cateService: CatesService,
    private gameDataService: GameDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.gameResults = await this.gameResultsService.list();

    this.calculateStats();

    const allCategories = await this.cateService.list();
    this.calculateCategoryStats(allCategories);

    this.calculateMonthlyChallenge();

    this.calculateStrikeDays();
  }

  calculateStats(): void {
    this.gamesPlayed = this.gameResults.length;

    this.totalPoints = this.gameResults.reduce(
      (sum, result) => sum + result.points,
      0
    );

    const gameTypeScores = this.calculateGameTypeScores();
    this.highestAvgScoreGame = this.getHighestAvgScoreGame(gameTypeScores);
    this.lowestAvgScoreGame = this.getLowestAvgScoreGame(gameTypeScores);

    const perfectGames = this.gameResults.filter(
      (result) => result.points === 100
    );
    if (perfectGames.length == 0) {
      this.perfectGamesPercentage = 0;
    } else {
      this.perfectGamesPercentage = Math.round(
        (perfectGames.length / this.gamesPlayed) * 100
      );
    }
    this.mostPlayedCategory = this.calculateMostPlayedCategory();
    if (this.mostPlayedCategory) {
      this.loadMostCategory();
    } else {
      this.mostPlayedCategory === 'you didnt play yet!';
    }
  }

  async loadMostCategory(): Promise<void> {
    this.mostPlayed = await this.cateService.get(this.mostPlayedCategory);
  }

  calculateGameTypeScores(): { [gameType: string]: number[] } {
    const gameTypeScores: { [gameType: string]: number[] } = {};

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
    let lowestAvg = 100;

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
      if (categoryCounts[categoryId] > maxCount) {
        maxCount = categoryCounts[categoryId];
        mostPlayedCategory = categoryId;
      }
    }
    this.maxCount = maxCount;

    return mostPlayedCategory;
  }

  calculateCategoryStats(allCategories: Category[]): void {
    // Calculate categories learned
    this.categoriesLearned = new Set(
      this.gameResults.map((result) => result.categoryId)
    ).size;

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
    const currentDate = new Date();

    // Loop through each previous day until no games are found
    // eslint-disable-next-line no-constant-condition
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
