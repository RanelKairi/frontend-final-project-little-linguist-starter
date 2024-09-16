import { CommonModule} from '@angular/common';
import {  ChangeDetectionStrategy,  Component,  Input,  OnInit,} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../shared/model/category';
import { ExitButtonComponent } from '../../in-game-comp/exit-button/exit-button.component';
import { MatCardModule } from '@angular/material/card';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GameProfile } from '../../../shared/model/GameProfile';
import { ProgressBarComponent } from "../../in-game-comp/progress-bar/progress-bar.component";
import { GamePointsComponent } from "../../in-game-comp/game-points/game-points.component";


@Component({
  selector: 'app-mixxed-letters',
  standalone: true,
  imports: [CommonModule, MatInputModule, ExitButtonComponent, MatCardModule,
    FormsModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule, ProgressBarComponent, GamePointsComponent],
  templateUrl: './mixxed-letters.component.html',
  styleUrl: './mixxed-letters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixxedLettersComponent implements OnInit {
  displayedColumns : string []= [
    'origin',
    'target' ,
    'guess',
     'answer',
     
    ];
    gameUrl='./mixxed-letters';
  dataSource: TranslatedWord[] = [];
  isLoading = true;
  @Input()
  id?: string;
  selectedCate?: Category;
  selectedGame? : GameProfile;
  words: TranslatedWord[] = [];
  
  mixedWord: string = '';
  index = -1;
  triesCount = 0;
  gamePoints = 0;
  numSuccess = 0;
  grade = 0;
  
  endGame = false;
    prig=0;
    
  constructor(
    public dialogService : MatDialog,
    private categoryService: CategoriesService,
    
  ) {}

  ngOnInit(): void {     
    if (this.id) {
      
      const cateId = this.id;
      this.selectedCate = this.categoryService.get(cateId);
      if (this.selectedCate) {
        this.words = [...this.selectedCate.words];
        this.words = this.words.sort(()=>Math.random()-0.5);
        this.gamePoints = 100 / this.words.length;
        
      }
    }
    this.startNewGame();
  }

  nextWord() {
    console.log("nextWord()!")
    if (this.words && this.index < this.words.length - 1) {
      console.log("origin word mix success!")
      this.index++;
      this.grade = Math.floor(this.gamePoints*this.numSuccess);
      this.mixedWord = [...this.words[this.index].origin]
        .sort(() => Math.random() - 0.5)
        .join('')
        .toLocaleLowerCase();
      if (
        this.mixedWord.toLocaleLowerCase() === this.words[this.index].origin.toLocaleLowerCase()
      ) {
        console.log('sorted to same word case handled');
        this.index--;
        this.nextWord();
      }
    }
  }

  reset() {
    if (this.words) this.words[this.index].guess = '';
  }

  submit() {

    this.triesCount++;
    const currentWord = this.words && this.words[this.index];
    
    const isSuccess =
      currentWord?.guess.toLocaleLowerCase() ===
      currentWord?.origin.toLocaleLowerCase();
      
      const isEndOfGame = this.index + 1 === this.words?.length;
      if(!isEndOfGame)
        this.dialogService.open(FeedbackDialogComponent,{
      data:isSuccess,
    });

    if(isSuccess){
      this.numSuccess++;
      this.words[this.index].answer = true;
      
    }else{
      this.words[this.index].answer = false;
      
    }
    if(isEndOfGame&&this.id&&this.selectedCate){

      this.dataSource = [...this.words]
      this.endGame = true;

      
    }else{ 
     
      
      this.nextWord();
      this.reset()
    }
  }

  calculateProgress() {
    const totalWords = this.words.length || 0;
    const guessedWordsRatio = this.numSuccess / totalWords;
    const categoryProgressRatio = this.index / totalWords;
    const progress = Math.max(guessedWordsRatio, categoryProgressRatio) * 100;
    console.log(progress)
    return progress; 
    
  }

  startNewGame() {
    console.log('GameStarted!');
    this.isLoading = false;
    this.nextWord();
  }

  playAgain(){
    window.location.reload()
  }

  anotherCate(){
    
  }
}
