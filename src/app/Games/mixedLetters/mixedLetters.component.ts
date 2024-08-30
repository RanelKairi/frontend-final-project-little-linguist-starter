import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Category } from '../../../shared/model/category';
import { GameDataService } from '../../services/GameData.service';
import { CategoriesService } from '../../services/categories.service';
import { GameProfile } from '../../../shared/model/GameProfile';
import { DeleteCategoryDialogComponent } from '../../delete-category-dialog/delete-category-dialog.component';
import { GameCardComponent } from '../../game-card/game-card.component';
import { ActivatedRoute } from '@angular/router';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ExitGameDialogComponent } from '../../game-dialogs/exit-game-dialog/exit-game-dialog.component';
import { ScoreComponent } from '../../score/score.component';
import { FeedbackDialogComponent } from '../../game-dialogs/feedback-dialog/feedback-dialog.component';
import { GameRandomService } from '../../services/game-random.service';
@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [
    CommonModule,
    DeleteCategoryDialogComponent,
    GameCardComponent,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatButtonModule,
    ExitGameDialogComponent,
    ScoreComponent,
    FeedbackDialogComponent,
  ],
  templateUrl: './mixedLetters.component.html',
  styleUrl: './mixedLetters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent implements OnInit {
  @Input()
  id?: number;
  categoryId = 0;
  selectedCategory?: Category;
  selectedGame?: GameProfile;
  allGames: GameProfile[] = [];
  sortCateWordsDupli: TranslatedWord[] = [];
  sortCateWords : TranslatedWord [] = [];
  sortCateWordsmix : TranslatedWord [] = [];

  word1 = ''
  word2 = ''
  word2arr= ['']
  word3 = ''
  
  wordlord : any;
  
  constructor(
    private route: ActivatedRoute,
    private CategoryService: CategoriesService,
    private GameDataService: GameDataService,
    public dialogService: MatDialog,
    private randomService : GameRandomService
  ) {}

  ngOnInit(): void {
    this.allGames = this.GameDataService.list()
    this.selectedGame = this.allGames[0]

    this.route.paramMap.subscribe((params) => {
      this.categoryId = +params.get('id')!;
      this.selectedCategory = this.CategoryService.get(this.categoryId)
      this.sortCateWords = this.selectedCategory? [...this.selectedCategory?.words] : [];// return Translated[]
      // this.sortCateWordsmix.sort(() => Math.random()-0.5)// רק 1 -- עבר לservice
      this.randomService.shuffleArray2(this.sortCateWords)
      //
      this.word1 = this.sortCateWords[0].origin
      // this.word2 = this.word1
      this.word2 = this.sortCateWords[0].origin
      // console.log("jjjjjjjjj"+typeof(this.word2))
      // console.log('this.word2!!!'+this.word2)
      this.word2 = this.word2.toLocaleLowerCase()
      this.word2arr = this.word2.split('')
      
      this.wordlord = this.randomService.shuffleArray3(this.word2arr)
      this.word3 = this.word2arr.join('')
      

      // console.log('this.word2LOWERCASE!!!'+this.word2)
      // const wordlord = (this.word1.toLocaleLowerCase())
      console.log('selectCategory'+JSON.stringify(this.selectedCategory?.words)) // return Category[]
      console.log('sortCateWords'+JSON.stringify(this.sortCateWords))
      console.log('sortCateWordsDupli'+JSON.stringify(this.sortCateWordsDupli))
      console.log('mixMIX:'+JSON.stringify(this.sortCateWordsmix))
    });
  }




  // shuffleArray(array: TranslatedWord[]): TranslatedWord[] {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  //   }
  //   return array;
  // }



  exitDialog() {
    this.dialogService.open(ExitGameDialogComponent);
  }
}






  // fetchCategoryDetails(): void {
  //   this.allGames = this.GameDataService.list();
  //   this.selectedGame = this.allGames[0];

  //   this.selectedCategory = this.CategoryService.get(this.categoryId);
  //   this.selectedCategoryWords = this.selectedCategory? [...this.selectedCategory?.words] : [];
   
   
    
    
   
  // }

  