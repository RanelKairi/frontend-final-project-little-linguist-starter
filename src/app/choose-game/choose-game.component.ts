import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { MatCardModule } from '@angular/material/card';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameProfile } from '../../shared/model/GameProfile';
import { GameDataService } from '../services/game-data.service';
import { SelectGameCategoryDialogComponent } from '../select-game-category-dialog/select-game-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    GameCardComponent,
    SelectGameCategoryDialogComponent,
  ],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {
  allGames: GameProfile[] = [];
  allCate: Category[] = [];

  constructor(
    private gameService: GameDataService,
    private categoryService: CategoriesService,
    public dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.allGames = this.gameService.list();
    this.categoryService.list().then((result:Category[]) => (this.allCate = result));  }
  openDialog(): void {
    this.dialogService.open(SelectGameCategoryDialogComponent);
  }
}
