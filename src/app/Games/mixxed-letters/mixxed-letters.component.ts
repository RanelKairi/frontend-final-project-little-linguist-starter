import { CommonModule,NgFor, } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
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
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GamePlayed } from '../../../shared/model/game-played.';
import { ScoreComponent } from "../../score/score.component";
import { FormsModule } from '@angular/forms';
// import { MatFormField } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GameProfile } from '../../../shared/model/GameProfile';
import { ProgressBarComponent } from "../../in-game-comp/progress-bar/progress-bar.component";
import { GameRandomService } from '../../services/RanDomGaMeBNack.service';
import { InGameServiceService } from '../../services/in-game.service';

@Component({
  selector: 'app-mixxed-letters',
  standalone: true,
  imports: [CommonModule, MatInputModule, ExitButtonComponent, MatCardModule, ScoreComponent,
    FormsModule, MatTableModule, MatButtonModule, MatIconModule, RouterModule, ProgressBarComponent],
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
  allGames:GameProfile[] = []; // לשלב של הכפתור שיוביל בראוטר לינק
  words: TranslatedWord[] = [];
  answers:boolean[]=[];
  mixedWord: string = ''; // לשקול אולי להוסיף אחר כך לקטטגוריה כנראה שלא
  index = -1;
  triesCount = 0;
  gamePoints = 0;
  numSuccess = 0;
  grade = 0;
  lastGamePlayed = new GamePlayed (0,0,0)
  endGame = false;
    prig=0;
    
  constructor(
    public dialogService : MatDialog,
    private categoryService: CategoriesService,
    private inGameService:InGameServiceService
  ) {} // להוסיף גיימ סרוויס במידה ונחליט על הכפתורים 

  ngOnInit(): void {      // לא לשכוח להוריד חלקים לא רלוונטים
    if (this.id) {
      
      const cateId = parseInt(this.id);
      this.selectedCate = this.categoryService.get(cateId);
      if (this.selectedCate) {
        this.words = [...this.selectedCate.words];
        this.words = this.words.sort(()=>Math.random()-0.5);
        this.gamePoints = 100 / this.words.length;
        console.log(this.selectedCate)
        console.log(this.words)
        console.log(this.answers)
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
        this.mixedWord.toLocaleLowerCase() === this.words[this.index].origin
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
      alert(JSON.stringify(this.words))
      this.answers[this.index] = true;
    }else{
      this.words[this.index].answer = false;
      this.answers[this.index] = false;
    }
    if(isEndOfGame&&this.id&&this.selectedCate){

      this.dataSource = [...this.words]
      this.endGame = true;

      // console.log("GAME-ENDED! =>,",this.endGame ,)
      //   console.log("words Results =>",JSON.stringify(this.words))
      
      // const game: GamePlayed = {
      //   words:this.words,
      //   date: new Date(),
      //   answers: this.answers,
      //   categoryId: parseInt(this.id),
      //   grade: this.gamePoints * this.numSuccess,
      //   gamePlayedId: 0

      

      // }
      // alert("GAMEENDED , WellDone"+JSON.stringify(this.words))
      
      // this.lastGamePlayed === game;
      
      // console.log("game",game);
      // console.log("THIS.lasdt",this.lastGamePlayed)
      // this.endGame = true;
    }else{ 
     
      alert(this.prig);
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
    return progress; // maybe set the value to service
    
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
