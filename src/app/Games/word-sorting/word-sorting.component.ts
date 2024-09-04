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
    MatIconModule
  ],
  templateUrl: './word-sorting.component.html',
  styleUrl: './word-sorting.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSortingComponent {
  displayedColumns: string[] = ['origin', 'target', 'guess', 'answer'];
  dataSource: TranslatedWord[] = [];
  isLoading = true;
  @Input() id?: string;
  selectedCate?: Category;
  randomCategory?: Category;
  words: TranslatedWord[] = [];
  allCates: Category[] = [];
  currentWord: string = '';
  index = -1;
  triesCount = 0;
  gamePoints = 0;
  numSuccess = 0;
  grade = 0;
  endGame = false;
  gameRandomWords?:any

  constructor(
    public dialogService: MatDialog,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      const cateId = parseInt(this.id);
      this.selectedCate = this.categoryService.get(cateId);
      if (this.selectedCate) {
        this.initializeGame();
      }
    }
  }

  initializeGame() {
    this.words = [...this.selectedCate!.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    this.allCates = this.categoryService.list();
    this.randomCategory = this.allCates
      .filter((c) => c.id !== this.selectedCate!.id)
      .sort(() => Math.random() - 0.5)[0];
    const randomWords = [...this.randomCategory!.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    this.words = [...this.words, ...randomWords].sort(
      () => Math.random() - 0.5
    );
    

    this.gamePoints = 100 / this.words.length;
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
}
