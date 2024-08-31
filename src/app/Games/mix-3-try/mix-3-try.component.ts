import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../../shared/model/category';
import { GameProfile } from '../../../shared/model/GameProfile';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { CategoriesService } from '../../services/categories.service';
import { GameRandomService } from '../../services/game-random.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ExitGameDialogComponent } from '../../game-dialogs/exit-game-dialog/exit-game-dialog.component';
import { FeedbackDialogComponent } from '../../game-dialogs/feedback-dialog/feedback-dialog.component';
import { TimerComponent } from '../../Timer/Timer.component';
import { FormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GamePlayed } from '../../../shared/model/game-played.';
import { AllGamesService } from '../../services/all-games.service';

@Component({
  selector: 'app-mix-3-try',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    NgFor,
    NgIf,
    MatProgressSpinnerModule,
    TimerComponent
],
  templateUrl: './mix-3-try.component.html',
  styleUrl: './mix-3-try.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Mix3TryComponent implements OnInit { 
  currentGame = new GamePlayed(0,0,0,0,0)
    isLoading = true;
    @Input()
    id?: string;
    yid?: number;
    selectedCategory?: Category;
    words: TranslatedWord[] = [];
    randomCateWords: TranslatedWord[] = [];
    selectedGame?: GameProfile;
    mixWord : string ='';
    
    tryCount = 0;
    index = -1;
    endGame = false ; 
    gamePoints:number = 0;
    numSuccess = 0;
    grade? : number;
    gameDuration : number = 0 ;
    displayTimeLeft : string = '';
    allGamesPlayed : GamePlayed[] = [];

    @ViewChild(TimerComponent) timerComponent!: TimerComponent
  
    constructor(
      private categoriesService: CategoriesService ,
      private gameManagerService: GameRandomService ,
      private gamePlayerDifficultyService: GameRandomService ,
      public dialogService: MatDialog ,
      private gamesDataService : AllGamesService ,
      
      

    ) {}
  
    

    ngOnInit(): void {
      if(this.id){
        const categoryData = this.categoriesService.get(parseInt(this.id));
        
        
        

        if(categoryData) {
          this.allGamesPlayed = this.gamesDataService.list();
          console.log('allGamesPlayed',this.allGamesPlayed)
          this.gamePoints = 100 / categoryData.words.length
          console.log('gamePoints',this.gamePoints)
          this.selectedCategory = categoryData;
        }
      }
      
      console.log(this.selectedCategory)
      this.words = this.selectedCategory ? [...this.selectedCategory.words]:[];
      console.log(this.words)
      this.startNewGame();
      // this.gameDuration = this.gameManagerService.getGameDuration(
      //   GameDifficulty.HARD
      // );
      
      // const originalArray = this.selectedCategory
      // console.log(originalArray)
      // this.cateWords = this.selectedCategory
      //   ? [...this.selectedCategory.words]
      //   : [];
      //   this.randomCateWords = [...this.cateWords]  
      // this.randomCateWords = this.randomService.ordeRandom(this.randomCateWords);
      
      // for(let i = this.cateWords.length -1 ; i>-1 ; i--){
      //   console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",i)
  
      //   console.log("ranDOM",this.randomCateWords[i])
      //   console.log("originalArray",this.selectedCategory?.words[i])
      // }
    }
    //next word
    nextWord(){
      if(this.words && this.index < this.words.length - 1){
        this.index++;
        this.grade = this.gamePoints * this.numSuccess;
        console.log(this.index)
        this.mixWord = [...this.words[this.index].origin].sort(() => Math.random() - 0.5).join('').toLocaleUpperCase();
        if(this.mixWord.toLocaleLowerCase() === this.words[this.index].origin.toLocaleLowerCase()){
          console.log('this.mixWordAFTERSORT=>INTO=>IF=>this.mixWord=>',this.mixWord.toLocaleLowerCase())
          console.log('this.mixWordAFTERSORT=>INTO=>IF=>this.origini=>',this.words[this.index].origin)
          this.index--;
          console.log("the words are the SameAGAIN AMIGO =>newINDEX",this.index)
          console.log("word sorted to same order , runnin again")
          this.nextWord()
        }
        console.log('this.mixWordAFTERSORT',this.mixWord)
        console.log('this.mixWordAFTERSORT',this.words[this.index].origin)
      }
    }

    reset(){
      if (this.words) this.words[this.index].guess = '';
    }

    submit(){
      this.tryCount++;
      console.log(this.tryCount)
      alert(this.tryCount)
      const currentWord = this.words && this.words[this.index];
      const isSucces = currentWord?.guess.toLocaleLowerCase() === currentWord?.origin.toLocaleLowerCase();
      // const isSucces2 = currentWord?.['guess'] === currentWord?.['origin'];
      const isEndOfGame = this.index +1 === this.words?.length;
      if(!isEndOfGame)
        this.dialogService.open(FeedbackDialogComponent, {
      data : isSucces,
    });

      if(isSucces) {
        // alert("good!")
        this.numSuccess++
        
      } else {
        alert("BAD!")
        this.numSuccess = this.numSuccess ;
      }

      if (isEndOfGame && this.id&&this.selectedCategory&&this.gamePoints){
        const game : GamePlayed = {
          words : this.words,
          date: new Date(),
          idCategory : this.selectedCategory.id,
          numOfPoints : this.gamePoints * this.numSuccess,
          secondsLeftInGame : this.index, //this.timerComponent.getTimeLeft(),
          secondsPlayed : this.index, //this.gameDuration - this.timerComponent.getTimeLeft(),
          gamePlayedId : this.gamePoints, // לחשוב על דרך לסכום ID
        };
        this.gamesDataService.add(game)
        this.gamePlayerDifficultyService.addGamePlayed(game) //.then(() => {
        this.endGame = true ;
      //}); without the then
    }else {
      this.nextWord();
      this.reset();
    }
  }

    exit(){
      this.dialogService.open(ExitGameDialogComponent)
    }

    calculateProgress(){
      const totalWords = this.words.length || 0 ;
      const guessedWordsRatio = this.numSuccess / totalWords;
      const categoryProgressRatio = this.index / totalWords;
      const progress = Math.max(guessedWordsRatio, categoryProgressRatio) *100;
      return progress;
    }

    startNewGame(){
      this.isLoading = false;
      this.nextWord()
      
    }
  }
  

