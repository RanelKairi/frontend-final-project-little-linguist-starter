import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../../shared/model/categories/category';
import { TranslatedWord } from '../../../shared/model/categories/translated-word';
import { ProgressBarComponent } from '../../in-game-comp/progress-bar/progress-bar.component';
import { ExitButtonComponent } from '../../in-game-comp/exit-button/exit-button.component';
import { FormsModule } from '@angular/forms';
import { GamePointsComponent } from '../../in-game-comp/game-points/game-points.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CatesService } from '../../services/category-services/category.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameResult } from '../../../shared/model/games/game-result.';
import { GameResultsService } from '../../services/game-services/game-results.service';
import { GameProfile } from '../../../shared/model/games/game-profile';
import { SelectGameCategoryDialogComponent } from '../../select-game-category-dialog/select-game-category-dialog.component';

@Component({
  selector: 'app-word-sorting',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    ExitButtonComponent,
    FormsModule,
    GamePointsComponent,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './word-sorting.component.html',
  styleUrl: './word-sorting.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSortingComponent implements OnInit {
  displayedColumns: string[] = ['origin', 'target', 'guess', 'answer'];
  dataSource: TranslatedWord[] = [];
  isLoading = true;
  currentGame = new GameProfile(
    2,
    'Word Sorting',
    'In this game you need to match a word to a category',
    'Games/word-sorting'
  );
  @Input() id?: string;
  selectedCate?: Category;

  words: TranslatedWord[] = [];
  allCates: Category[] = [];
  currentWord: string = '';
  selectedWords: TranslatedWord[] = [];

  index = -1;
  triesCount = 0;
  gamePoints = 0;
  numSuccess = 0;
  grade = 0;
  gameId = 2;

  endGame = false;
  gameRandomWords?: TranslatedWord[] = [];
  randomCategory?: Category;

  constructor(
    public dialogService: MatDialog,
    private cateService: CatesService,
    private route: ActivatedRoute,
    private gameResultsService: GameResultsService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.id) {
      const cateId = this.id;

      this.selectedCate = await this.cateService.get(cateId);
      const cateChose = this.selectedCate;
      if (cateChose) {
        this.initializeGame();
      }
    }
  }

  async initializeGame(): Promise<void> {
    this.allCates = await this.cateService.list();
    this.selectedWords = [...this.selectedCate!.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    this.randomCategory = this.allCates
      .filter((c) => c.id !== this.selectedCate!.id)
      .sort(() => Math.random() - 0.5)[0];

    this.gameRandomWords = [...this.randomCategory!.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    this.words = [...this.selectedWords, ...this.gameRandomWords];
    this.words.sort(() => Math.random() - 0.5);

    this.gamePoints = 100 / this.words.length;
    console.log(this.gamePoints);
    this.startGame();
  }

  startGame() {
    this.isLoading = false;
    this.index = -1;
    this.nextWord();
  }

  nextWord() {
    console.log('gameStarted!');
    if (this.index + 1 < this.words.length) {
      this.index++;
      this.currentWord = this.words[this.index].origin.toLocaleUpperCase();
    } else {
      this.endGame = true;
      this.endGameSaveResults();
    }
  }

  guess(isCurrentCategory: boolean) {
    const currentWord = this.words[this.index];
    const isCorrect =
      (isCurrentCategory && this.selectedCate!.words.includes(currentWord)) ||
      (!isCurrentCategory && !this.selectedCate!.words.includes(currentWord));

    this.dialogService.open(FeedbackDialogComponent, {
      data: isCorrect,
    });

    if (isCorrect) {
      this.numSuccess++;
      this.grade = Math.floor(this.numSuccess * this.gamePoints);
      console.log(this.grade);
      this.words[this.index].answer = true;
    } else {
      this.words[this.index].answer = false;
    }

    this.nextWord();
  }

  calculateProgress() {
    const totalWords = this.words.length || 0 ;
    const guessedWordsRatio = this.numSuccess / totalWords;
    const categoryProgressRatio = this.index / totalWords;
    const progress = Math.max(guessedWordsRatio, categoryProgressRatio) * 100;



    return ((this.index + 1) / this.words.length) * 100;
  }

  playAgain() {
    window.location.reload();
  }
  async endGameSaveResults() {
    const gameResult = new GameResult(
      this.selectedCate!.id,
      this.gameId, // Generate a unique game ID (could be a random string)
      new Date(), // Current date
      this.grade // The player's final score
    );

    await this.gameResultsService.addGameResult(gameResult);
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
