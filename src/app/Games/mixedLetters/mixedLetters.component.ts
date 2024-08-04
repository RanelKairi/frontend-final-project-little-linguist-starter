import { CommonModule } from '@angular/common';
import {  ChangeDetectionStrategy,  Component,  Input,  OnInit,} from '@angular/core';
import { SelectGameCategoryDialogComponent } from '../../select-game-category-dialog/select-game-category-dialog.component';
import { Category } from '../../../shared/model/category';
import { GameDataService } from '../../services/GameData.service';
import { CategoriesService } from '../../services/categories.service';
import { GameProfile } from '../../../shared/model/GameProfile';
import { DeleteCategoryDialogComponent } from "../../delete-category-dialog/delete-category-dialog.component";
import { GameCardComponent } from "../../game-card/game-card.component";

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [CommonModule, DeleteCategoryDialogComponent, GameCardComponent],
  templateUrl: './mixedLetters.component.html',
  styleUrl: './mixedLetters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent implements OnInit{  
  @Input()
  
  currentCate?:Category;
  Cate = '';
  allCates : Category[] = [];
  constructor(
    private CategoriesService : CategoriesService,
  private GameDataService  : GameDataService,){}

  ngOnInit(): void {
    this.allCates = this.CategoriesService.list();
    this.Cate = this.GameDataService.getGameURL(1,2);
  // this.currentCate = this.CategoriesService.get()
  }
}