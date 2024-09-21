import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../shared/model/category';
import { ExitButtonComponent } from '../../in-game-comp/exit-button/exit-button.component';
import { MatCardModule } from '@angular/material/card';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GameProfile } from '../../../shared/model/GameProfile';
import { ProgressBarComponent } from '../../in-game-comp/progress-bar/progress-bar.component';
import { GamePointsComponent } from '../../in-game-comp/game-points/game-points.component';
import { CatesService } from '../../services/cates.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameResultsService } from '../../services/game-results.service';
import { GameResult } from '../../../shared/model/game-result.';


// fix the grade calculation
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
    MatProgressSpinnerModule
  ],
  templateUrl: './mixxed-letters.component.html',
  styleUrl: './mixxed-letters.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixxedLettersComponent implements OnInit {
  displayedColumns: string[] = ['origin', 'target', 'guess', 'answer'];
  gameUrl = './mixxed-letters';
  dataSource: TranslatedWord[] = [];
  isLoading = true;
  @Input()
  id?: string;
  selectedCate?: Category;
  selectedGame?: GameProfile;
  words: TranslatedWord[] = [];

  mixedWord: string = '';
  index = -1;
  triesCount = 0;
  gamePoints = 0;
  numSuccess = 0;
  grade?: number;

  endGame = false;
  prig = 0;
  gameId= 1;

  constructor(
    public dialogService: MatDialog,
    private cateService: CatesService,
    private gameResultsService:GameResultsService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.id) {
      console.log(this.id); ///////////////////////////////////////
      const cateId = this.id;

      this.selectedCate = await this.cateService.get(cateId);
      console.log(this.selectedCate);
      if (this.selectedCate) {
        this.words = [...this.selectedCate.words];
        console.log(this.words);
        this.words = this.words.sort(() => Math.random() - 0.5);
        console.log('this.words after', this.words);
        this.gamePoints = 100 / this.words.length;
      }
    }
    
    this.startNewGame();
  }

  nextWord() {
    this.grade = Math.floor(this.gamePoints * this.numSuccess);
    console.log('nextWord()!');
    if (this.words && this.index < this.words.length - 1) {
      console.log('origin word mix success!');
      this.index++;
     
      this.mixedWord = [...this.words[this.index].origin]
        .sort(() => Math.random() - 0.5)
        .join('')
        .toLocaleLowerCase();
      if (
        this.mixedWord.toLocaleLowerCase() ===
        this.words[this.index].origin.toLocaleLowerCase()
      ) {
        console.log('sorted to same word case handled');
        this.index--;
        this.nextWord();
      }
    }else{
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
      currentWord?.guess.toLocaleLowerCase() === currentWord?.origin.toLocaleLowerCase();

    // Show feedback dialog for the current guess
    this.dialogService.open(FeedbackDialogComponent, {
      data: isSuccess,
    });

    if (isSuccess) {
      this.numSuccess++;
      this.words[this.index].answer = true;
    } else {
      this.words[this.index].answer = false;
    }

    const isEndOfGame = this.index + 1 === this.words.length;

    if (isEndOfGame) {
      this.dataSource = [...this.words];
      this.endGame = true;  // End the game after the last guess
    } else {
      this.nextWord();  // Proceed to the next word
      this.reset();  // Reset the guess input
    }
  }

  // Calculate the progress for the progress bar
 
  async endGameSaveResults() {
    const gameResult = new GameResult(
      this.selectedCate!.id,  // Category ID
      this.gameId,  // Unique Game ID
      new Date(),  // Current date
      this.calculatePoints()  // Points (grade)
    );

    

    await this.gameResultsService.addGameResult(gameResult);
    console.log('Game result saved:', gameResult);
  }

  calculatePoints(): number {
    return Math.floor((this.numSuccess * this.gamePoints));  // Simple percentage calculation
  }

  calculateProgress() {
    const totalWords = this.words.length || 0;
    const guessedWordsRatio = this.numSuccess / totalWords;
    const categoryProgressRatio = this.index / totalWords;
    const progress = Math.max(guessedWordsRatio, categoryProgressRatio) * 100;
    return progress;
  }

  startNewGame() {
    console.log('GameStarted!');
    this.isLoading = false;
    this.nextWord();
  }

  playAgain() {
    window.location.reload();
  }

  anotherCate() {}
}
