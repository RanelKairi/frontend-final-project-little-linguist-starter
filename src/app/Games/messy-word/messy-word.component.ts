import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { GameProfile } from '../../../shared/model/game-profile';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { SelectGameCategoryDialogComponent } from '../../select-game-category-dialog/select-game-category-dialog.component';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './messy-word.component.html',
  styleUrls: ['./messy-word.component.css'],
})
export class MessyWordComponent implements OnInit {
  displayedColumns: string[] = ['origin', 'target', 'guess', 'answer'];

  dataSource: TranslatedWord[] = [];

  currentGame = new GameProfile(
    3,
    'Messy Words',
    'In this game you should fix the order But you limited with time! of the letters to the correct order of the word',
    'Games/messy-words'
  );
  isLoading = true;
  @Input()
  id?: string;
  selectedCate?: Category;
  words: TranslatedWord[] = [];
  mixedWord: string = '';
  index = -1;
  tryCount = 0;
  gamePoints = 0;
  numSuccess = 0;
  grade = 0;
  endGame = false;
  timer = 60; // Timer set to 60 seconds
  interval?: any; // Holds the interval reference

  wordsPlayed: { word: string; guess: string; correct: boolean }[] = [];
  userGuess = '';
  totalWords = 0;
  constructor(
    private cateService: CatesService,
    public dialogService: MatDialog,
    private gameResultService: GameResultsService
  ) {}

  async ngOnInit() {
    if (this.id) {
      this.selectedCate = await this.cateService.get(this.id);
      if (this.selectedCate) {
        this.initializeGame();
      }
    }
  }
  async initializeGame() {
    console.log('Initializing game with category:', this.selectedCate);
    console.log('initializing GameProfile ', this.currentGame);
    this.words = [...this.selectedCate!.words];
    this.words = this.words.sort(() => Math.random() - 0.5);
    this.gamePoints = 100 / this.words.length;
    this.startNewGame();

    this.nextWord();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.timeIsUp();
      }
    }, 500); // Update timer every second
  }

  nextWord() {
    console.log('next Word()!');
    if (this.words && this.index < this.words.length - 1) {
      this.index++;
      const word = this.selectedCate?.words[this.index].origin;
      console.log(word);
      this.mixedWord = this.shuffleWord(word!);
    } else {
      // Math.floor(this.points);
      // console.log(this.points);
      // this.showSummary();
    }
  }

  shuffleWord(word: string): string {
    let shuffledWord = word;

    // Keep shuffling until the shuffled word is different from the original word
    while (shuffledWord === word) {
      shuffledWord = word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
    }

    return shuffledWord;
  }

  timeIsUp() {
    this.endGameSaveResults();
  }

  submit() {
    this.tryCount++;
    const currentWord = this.selectedCate?.words[this.index].origin;
    const isSuccess =
      this.words[this.index].guess.toLowerCase() === currentWord?.toLowerCase();
    this.dialogService.open(FeedbackDialogComponent, { data: isSuccess });

    if (isSuccess) {
      this.numSuccess++;
      this.grade = Math.floor(this.numSuccess * this.gamePoints);
      this.words[this.index].answer = true;
    } else {
      this.words[this.index].answer = false;
    }

    // Save the result for the summary screen
    this.wordsPlayed.push({
      word: currentWord || '',
      guess: this.userGuess,
      correct: isSuccess,
    });

    const isEndOfGame = this.index + 1 === this.words.length;

    if (isEndOfGame || this.endGame == true) {
      this.endGameSaveResults(); // End the game when all words are guessed
    } else {
      this.nextWord(); // Move to the next word
      this.reset();
    }
  }
  async endGameSaveResults() {
    const gameResult = new GameResult(
      this.id!,
      this.currentGame.id,
      new Date(),
      this.grade
    );
    await this.gameResultService.addGameResult(gameResult);

    clearInterval(this.interval); // Stop the timer
    // Save game result here, like in the previous game
  }

  reset() {
    if (this.words) this.words[this.index].guess = ''; // Clear the input field
  }

  showSummary() {
    // Navigate to the summary screen or show it within this component
    // this.saveGameResult();
  }

  // saveGameResult() {
  //   const gameResult: GameResult = {
  //     categoryId: this.id!,
  //     gameId: this.currentGame.id,
  //     date: new Date(),
  //     points: this.points,
  //   };

  //   this.gameResultService.addGameResult(gameResult);
  // }

  calculateProgress() {
    return (this.index / this.words.length) * 100;
  }

  async startNewGame() {
    this.isLoading = false;
    console.log('Game Started!');
    this.nextWord();
    this.startTimer();
  }

  playAgain() {
    window.location.reload();
  }
  anotherCate() {
    const dialogRef = this.dialogService.open(
      SelectGameCategoryDialogComponent,
      {
        data: this.currentGame,
      }
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        console.log(result);
        window.location.reload();
      }
    });
  }
}
