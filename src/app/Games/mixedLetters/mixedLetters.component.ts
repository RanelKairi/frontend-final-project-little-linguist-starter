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
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
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
  // sortCateWordsDupli: TranslatedWord[] = [];
  sortCateWords: TranslatedWord[] = [];
  shuff: TranslatedWord[] = [];
  shuff2: TranslatedWord[] = [];
  sortCateWordsmix: TranslatedWord[] = [];
  shuffledArray: string[] = [];
  word1 = '';
  word2 = ''; // lion
  word2arr = ['']; // n,l,i,o

  nonShuffledArray: string[] = [];
  word3 = ''; // lion => //nilo

  wordlord: any;

  // originalArray = word2arr ['']

  constructor(
    private route: ActivatedRoute,
    private CategoryService: CategoriesService,
    private GameDataService: GameDataService,
    public dialogService: MatDialog,
    private randomService: GameRandomService
  ) {}

  ngOnInit(): void {
    this.allGames = this.GameDataService.list();
    this.selectedGame = this.allGames[0];

    this.route.paramMap.subscribe((params) => {
      this.categoryId = +params.get('id')!;
      this.selectedCategory = this.CategoryService.get(this.categoryId);
      console.log('selectedCategory', this.selectedCategory);
      // console.log("selectedCategory",JSON.stringify(this.selectedCategory?.words))
      this.sortCateWords = this.selectedCategory
        ? [...this.selectedCategory?.words]
        : []; // return Translated[]
      this.shuff = [...this.sortCateWords];
      console.log('shuffffffff', this.shuff);
      this.shuff2 = [...this.shuff];
      this.shuff2.toLocaleString();

      console.log('shuff2After9', this.shuff2);

      // this.randomService.shuffleArray2(this.sortCateWords)
      this.word1 = this.sortCateWords[0].origin;
      this.word2 = this.sortCateWords[0].origin;
      this.word2 = this.word2.toLocaleLowerCase();
      this.word1 = this.word1.toLocaleLowerCase();
      this.word2arr = this.word2.split('');
      this.nonShuffledArray = this.word2arr;
      console.log('word2arr', this.word2arr);
      console.log('nonShuffle', this.nonShuffledArray);

      // this.word2arr = this.randomService.shuffleArray3(this.word2arr)
      console.log('shuffleArray', this.shuffledArray);
      this.word3 = this.word2arr.join('');

      // if(this.word3 === this.word1){
      //   this.word2arr = this.randomService.shuffleArray3(this.word2arr)
      //   this.word2 = this.word2arr.join(''); //Don't forget to replace to word3
      // }

      // console.log('this.word2LOWERCASE!!!'+this.word2)
      const wordlord = this.word1.toLocaleLowerCase();
      // console.log('selectCategory'+JSON.stringify(this.selectedCategory?.words)) // return Category[]
      // console.log('sortCateWords'+JSON.stringify(this.sortCateWords))
      // console.log('sortCateWordsDupli'+JSON.stringify(this.sortCateWordsDupli))
      // console.log('mixMIX:'+JSON.stringify(this.sortCateWordsmix))
    });
  }

  fetching() {}

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
