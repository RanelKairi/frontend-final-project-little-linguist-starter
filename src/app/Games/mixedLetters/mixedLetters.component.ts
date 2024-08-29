import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit,} from '@angular/core';
import { Category } from '../../../shared/model/category';
import { GameDataService } from '../../services/GameData.service';
import { CategoriesService } from '../../services/categories.service';
import { GameProfile } from '../../../shared/model/GameProfile';
import { DeleteCategoryDialogComponent }
 from "../../delete-category-dialog/delete-category-dialog.component";
import { GameCardComponent } from "../../game-card/game-card.component";
import { ActivatedRoute } from '@angular/router';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ExitGameDialogComponent } from '../../game-dialogs/exit-game-dialog/exit-game-dialog.component';


@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [CommonModule, DeleteCategoryDialogComponent, GameCardComponent,
    MatIconModule,MatCardModule,MatProgressBarModule,MatFormFieldModule,
    MatButtonModule,ExitGameDialogComponent],
  templateUrl: './mixedLetters.component.html',
  styleUrl: './mixedLetters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent implements OnInit{  
 categoryId = 0 ; 
 selectedCategory?:Category;
 selectedGame? : GameProfile;
 allGames : GameProfile[] = [];

 selectedCategory2Str =''
 selectedCategoryWords? : TranslatedWord;
 constructor(
  private route : ActivatedRoute,
  private CategoryService : CategoriesService,
  private GameDataService : GameDataService,
  public dialogService : MatDialog,
 ){}

 ngOnInit(): void {
   this.route.paramMap.subscribe(params => {
    this.categoryId = +params.get('id')!;
    this.fetchCategoryDetails();
   })
 }
 fetchCategoryDetails(): void{
  this.allGames = this.GameDataService.list();
  this.selectedGame = this.allGames[0];
  this.selectedCategory = this.CategoryService.get(this.categoryId)
  this.selectedCategory2Str = JSON.stringify(this.selectedCategory?.words)
  this.selectedCategoryWords =JSON.parse(this.selectedCategory2Str)
 }

 exitDialog(){
  this.dialogService.open(ExitGameDialogComponent)
 }

}