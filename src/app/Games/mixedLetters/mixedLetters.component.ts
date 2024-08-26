import { CommonModule } from '@angular/common';
import {  ChangeDetectionStrategy,  Component,  Input,  OnInit,} from '@angular/core';
import { SelectGameCategoryDialogComponent } from '../../select-game-category-dialog/select-game-category-dialog.component';
import { Category } from '../../../shared/model/category';
import { GameDataService } from '../../services/GameData.service';
import { CategoriesService } from '../../services/categories.service';
import { GameProfile } from '../../../shared/model/GameProfile';
import { DeleteCategoryDialogComponent } from "../../delete-category-dialog/delete-category-dialog.component";
import { GameCardComponent } from "../../game-card/game-card.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [CommonModule, DeleteCategoryDialogComponent, GameCardComponent],
  templateUrl: './mixedLetters.component.html',
  styleUrl: './mixedLetters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent implements OnInit{  
 categoryId = 0 ; 
 selectedCategory?:Category;
 selectedGame?:GameProfile

 constructor(
  private route : ActivatedRoute,
  private CategoryService : CategoriesService
 ){}

 ngOnInit(): void {
   this.route.paramMap.subscribe(params => {
    this.categoryId = +params.get('id')!;
    this.fetchCategoryDetails();
   })
 }
 fetchCategoryDetails(): void{
this.selectedCategory = this.CategoryService.get(this.categoryId)
 }

}