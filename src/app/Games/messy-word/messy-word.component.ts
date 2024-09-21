import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CatesService } from '../../services/cates.service';
import { Category } from '../../../shared/model/category';
import { GameResult } from '../../../shared/model/game-result.';
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
import { GameResultsService } from '../../services/game-results.service';
import { ProgressBarComponent } from '../../in-game-comp/progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ExitButtonComponent } from '../../in-game-comp/exit-button/exit-button.component';
import { GamePointsComponent } from '../../in-game-comp/game-points/game-points.component';

@Component({
  selector: 'app-messy-word',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ExitButtonComponent,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    ProgressBarComponent,
    GamePointsComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './messy-word.component.html',
  styleUrls: ['./messy-word.component.css'],
  
})
export class MessyWordComponent implements OnInit {
  category?: Category;
  currentWordIndex = 0;
  mixedWord = '';
  userGuess = '';
  totalWords = 0;
  points = 0;
  pointsPerWord = 0;
  correctGuesses = 0;
  endGame = false;
  isLoading = true;
  timer = 60; // Timer set to 60 seconds
  interval?: any; // Holds the interval reference
  wordsPlayed: { word: string; guess: string; correct: boolean }[] = [];

  constructor(
    private cateService: CatesService,
    private route: ActivatedRoute,
    public dialogService: MatDialog,
    private router: Router,
    private gameResultService : GameResultsService
  ) {}

  async ngOnInit() {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.category = await this.cateService.get(categoryId);
      this.totalWords = this.category?.words.length || 0;
      this.pointsPerWord = 100 / this.totalWords;  // Don't floor here to avoid rounding too early

      console.log(this.pointsPerWord)
      this.isLoading=false;
      this.startTimer();
      this.nextWord();
    }
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.endGameFun(); // End game when timer reaches 0
      }
    }, 1000); // Update timer every second
  }

  nextWord() {
    if (this.currentWordIndex < this.totalWords) {
      const word = this.category?.words[this.currentWordIndex].origin || '';
      this.mixedWord = this.shuffleWord(word);
    } else {
      Math.floor(this.points)
      console.log(this.points)
      this.endGame = true;
      this.showSummary();
    }
  }

  shuffleWord(word: string): string {
    let shuffledWord = word;
  
    // Keep shuffling until the shuffled word is different from the original word
    while (shuffledWord === word) {
      shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    }
  
    return shuffledWord;
  }

  submitGuess() {
    const currentWord = this.category?.words[this.currentWordIndex].origin;
    const isCorrect = this.userGuess.toLowerCase() === currentWord?.toLowerCase();
    this.dialogService.open(FeedbackDialogComponent, { data: isCorrect });

    if (isCorrect) {
      this.points += this.pointsPerWord;
      this.correctGuesses++;
    }

    // Save the result for the summary screen
    this.wordsPlayed.push({
      word: currentWord || '',
      guess: this.userGuess,
      correct: isCorrect,
    });

    this.currentWordIndex++;
    this.userGuess = ''; // Clear the input field after submission

    if (this.currentWordIndex >= this.totalWords) {
      this.endGameFun();  // End the game when all words are guessed
    } else {
      this.nextWord();  // Move to the next word
    }
  }
  endGameFun() {
    Math.floor(this.points)
    this.endGame = true;
    clearInterval(this.interval);  // Stop the timer
    // Save game result here, like in the previous game
    console.log('Game over! Points:', this.points);
  }

  reset() {
    this.userGuess = '';  // Clear the input field
  }

  showSummary() {
    // Navigate to the summary screen or show it within this component
    this.saveGameResult();
  }

  saveGameResult() {
    
    const gameResult: GameResult = {
      categoryId: this.category?.id || '',
      gameId: 2, // Unique game ID for Messy Word Game
      date: new Date(),
      points: this.points,
    };

    this.gameResultService.addGameResult(gameResult);
  }

  calculateProgress() {
    const totalWords = this.wordsPlayed.length || 0;
    return (this.currentWordIndex / totalWords) * 100;
  }

  playAgain() {
    window.location.reload();
  }
}