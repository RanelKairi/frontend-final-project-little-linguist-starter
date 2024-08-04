import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit,Inject } from '@angular/core';
import { RouterModule,RouterOutlet,RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { GameProfile } from '../../../shared/model/GameProfile';
import { SelectGameCategoryDialogComponent } from '../../select-game-category-dialog/select-game-category-dialog.component';
import { Category } from '../../../shared/model/category';
import { CategoriesService } from '../../services/categories.service';
import { GameDataService } from '../../services/GameData.service';
@Component({
  selector: 'app-pair-of-words',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterModule, RouterOutlet,
    SelectGameCategoryDialogComponent
],
  templateUrl: './PairOfWords.component.html',
  styleUrl: './PairOfWords.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PairOfWordsComponent implements OnInit{
  @Input()
  
  currentCate?:Category;
  Cate = '';
  allCates : Category[] = [];
  constructor(
    private CategoriesService : CategoriesService,
    private GameDataService : GameDataService,
   ){}

  ngOnInit(): void {
    this.allCates = this.CategoriesService.list();
  this.Cate = this.GameDataService.getGameURL(3,4);
  
  }
}