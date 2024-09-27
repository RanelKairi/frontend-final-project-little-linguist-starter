import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../../shared/model/categories/category';
import { ExitButtonComponent } from '../../in-game-comp/exit-button/exit-button.component';
import { MatCardModule } from '@angular/material/card';
import { TranslatedWord } from '../../../shared/model/categories/translated-word';
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GameProfile } from '../../../shared/model/games/game-profile';
import { ProgressBarComponent } from '../../in-game-comp/progress-bar/progress-bar.component';
import { GamePointsComponent } from '../../in-game-comp/game-points/game-points.component';
import { CatesService } from '../../services/category-services/category.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameResultsService } from '../../services/game-services/game-results.service';
import { GameResult } from '../../../shared/model/games/game-result.';
import { SelectGameCategoryDialogComponent } from '../../select-game-category-dialog/select-game-category-dialog.component';

@Component({
  selector: 'app-mixxed-letters',
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
  templateUrl: './mixxed-letters.component.html',
  styleUrl: './mixxed-letters.component.css',
})
export class MixxedLettersComponent implements OnInit {
  displayedColumns: string[] = ['origin', 'target', 'guess', 'answer'];

  dataSource: TranslatedWord[] = [];

  currentGame = new GameProfile(
    1,
    'Mixed Letters',
    'In this game you should fix the order of the letters to the correct order of the word ',
    'Games/mixxed-letters'
  );
  isLoading = true;
  @Input()
  id?: string;
  selectedCate?: Category;
  words: TranslatedWord[] = [];
  mixedWord: string = '';
  index = -1;
  triesCount = 0;
  gamePoints = 0;
  numSuccess = 0;
  grade = 0;
  endGame = false;
  prig = 0;
  gameId = 1;

  constructor(
    public dialogService: MatDialog,
    private cateService: CatesService,
    private gameResultsService: GameResultsService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.id) {
      this.selectedCate = await this.cateService.get(this.id);
      if (this.selectedCate) {
        this.initializeGame();
      }
    }
  }
  async initializeGame(): Promise<void> {

    this.words = [...this.selectedCate!.words];
    this.words = this.words.sort(() => Math.random() - 0.5);
    this.gamePoints = 100 / this.words.length;

    this.startNewGame();
  }

  nextWord() {
    if (this.words && this.index < this.words.length - 1) {
      this.index++;
      this.mixedWord = [...this.words[this.index].origin]
        .sort(() => Math.random() - 0.5)
        .join('')
        .toLocaleLowerCase();
      if (
        this.mixedWord.toLocaleLowerCase() ===
        this.words[this.index].origin.toLocaleLowerCase()
      ) {
        this.index--;
        this.nextWord();
      }
    } else {
      this.endGame = true;
    }
  }

  reset() {
    if (this.words) this.words[this.index].guess = '';
  }

  submit() {
    this.triesCount++;
    const currentWord = this.words[this.index];

    const isSuccess =
      currentWord?.guess.toLocaleLowerCase() ===
      currentWord?.origin.toLocaleLowerCase();

    this.dialogService.open(FeedbackDialogComponent, {
      data: isSuccess,
    });

    if (isSuccess) {
      this.numSuccess++;
      this.grade = Math.floor(this.gamePoints * this.numSuccess);
      this.words[this.index].answer = true;
    } else {
      this.words[this.index].answer = false;
    }

    const isEndOfGame = this.index + 1 === this.words.length;

    if (isEndOfGame) {
      this.dataSource = [...this.words];
      this.endGameSaveResults();
      this.endGame = true;
    } else {
      this.nextWord(); 
      this.reset();
    }
  }

  async endGameSaveResults() {
    const gameResult = new GameResult(
      this.selectedCate!.id,
      this.currentGame.id!,
      new Date(),
      this.grade
    );
    await this.gameResultsService.addGameResult(gameResult);
  }

  calculateProgress() {
    const totalWords = this.words.length || 0;
    const guessedWordsRatio = this.numSuccess / totalWords;
    const categoryProgressRatio = this.index / totalWords;
    const progress = Math.max(guessedWordsRatio, categoryProgressRatio) * 100;
    return progress;
  }

  startNewGame() {
    this.isLoading = false;
    this.nextWord();
  }

  playAgain() {
    window.location.reload();
  }
  // GOLD
  anotherCate() {
    const dialogRef = this.dialogService.open(
      SelectGameCategoryDialogComponent,
      {
        data: this.currentGame,
      }
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
