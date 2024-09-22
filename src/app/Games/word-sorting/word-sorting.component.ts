import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../../shared/model/category';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { CategoriesService } from '../../services/categories.service';
import { ProgressBarComponent } from '../../in-game-comp/progress-bar/progress-bar.component';
import { ExitButtonComponent } from '../../in-game-comp/exit-button/exit-button.component';
import { FormsModule } from '@angular/forms';
import { GamePointsComponent } from '../../in-game-comp/game-points/game-points.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CatesService } from '../../services/cates.service';
import { ActivatedRoute } from '@angular/router';
import { GameResult } from '../../../shared/model/game-result.';
import { GameResultsService } from '../../services/game-results.service';
import { GameProfile } from '../../../shared/model/GameProfile';

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
  ],
  templateUrl: './word-sorting.component.html',
  styleUrl: './word-sorting.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSortingComponent {
  displayedColumns: string[] = ['origin', 'target', 'guess', 'answer'];
  dataSource: TranslatedWord[] = [];
  isLoading = true;
  currentGame = new GameProfile(
    2,
    'Word Sorting',
    'In this game you need to match a word to a category',
    'Games/word-sorting'
  );
  // @Input() id?: string;
  selectedCate?: Category;

  words: TranslatedWord[] = [];
  allCates: Category[] = [];
  currentWord: string = '';
  
  index = -1;
  triesCount = 0;
  gamePoints = 0;
  numSuccess = 0;
  grade = 0;
  gameId = 2;

  endGame = false;
  gameRandomWords?: any;
  randomCategory?: Category;

  constructor(
    public dialogService: MatDialog,
    private categoryService: CategoriesService, // might delete later
    private cateService: CatesService,
    private route: ActivatedRoute,
    private gameResultsService: GameResultsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      const cateId = params.get('id');      
      console.log('Category ID from route:', cateId);
      console.log(this.currentGame) // Log selected category ID

      if (cateId) {
        this.selectedCate = await this.cateService.get(cateId);
        console.log('Fetched category from Firestore:', this.selectedCate); // Log fetched category
        if (this.selectedCate) {
          this.initializeGame();
        }
      }
    });
  }
  async initializeGame(): Promise<void> {
    console.log('Initializing game with category:', this.selectedCate); // Log selected category

    const selectedWords = [...this.selectedCate!.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    console.log(
      'Randomly shuffled words from selected category:',
      selectedWords
    );

    // this.words = [...this.selectedCate!.words]
    //   .sort(() => Math.random() - 0.5)
    //   .slice(0, 3);                         ////////////////////////////REPLACED
    // console.log('Randomly shuffled words from selected category:', this.words);

    this.allCates = await this.cateService.list();
    console.log('All categories fetched from Firestore:', this.allCates); // Log all categories

    this.randomCategory = this.allCates
      .filter((c) => c.id !== this.selectedCate!.id) // Exclude the selected category
      .sort(() => Math.random() - 0.5)[0];
    console.log('Random non-selected category:', this.randomCategory); // Log the random category

    this.gameRandomWords = [...this.randomCategory!.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    this.words = [...this.words, ...this.gameRandomWords].sort(
      () => Math.random() - 0.5
    );
    console.log('Final word list for the game:', this.words); // Log final word list

    this.startGame();
  }

  startGame() {
    this.isLoading = false;
    this.index = -1;
    this.nextWord();
  }

  nextWord() {
    this.grade = Math.floor(this.gamePoints * this.numSuccess);
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
      this.words[this.index].answer = true;
    } else {
      this.words[this.index].answer = false;
    }

    this.nextWord();
  }

  calculateProgress() {
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
}
