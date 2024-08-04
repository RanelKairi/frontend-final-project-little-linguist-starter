import { CommonModule } from '@angular/common';
import {  ChangeDetectionStrategy,  Component,  Inject,  NgModule,  OnInit,} from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import {  MAT_DIALOG_DATA,  MAT_DIALOG_DEFAULT_OPTIONS,  MatDialogClose,  MatDialogContent,  MatDialogModule,} from '@angular/material/dialog';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router'; 
import { GameDataService } from '../services/GameData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-game-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './select-game-category-dialog.component.html',
  styleUrl: './select-game-category-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGameCategoryDialogComponent implements OnInit {
  currentCate?: Category;
  allCate: Category[] = [];
  GamePicked = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public currentGame: GameProfile,
    private CategoryService: CategoriesService,
    private GameDataService : GameDataService,
    
  ) {}

  ngOnInit(): void {
    this.allCate = this.CategoryService.list();
  }



  // getGameURL(_currentGame:GameProfile,_currentCate:Category): string {
  //   if (this.currentCate && this.currentGame) {
  //     _currentCate = this.currentCate;
  //     _currentGame = this.currentGame;
  //     return this.GameDataService.getGameURL(
  //       this.currentGame.id,
  //       this.currentCate.id
  //     );
  //   }
  //   return '';
  // }

}
