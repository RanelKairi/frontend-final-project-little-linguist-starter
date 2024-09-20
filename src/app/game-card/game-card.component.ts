import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/GameProfile';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectGameCategoryDialogComponent } from '../select-game-category-dialog/select-game-category-dialog.component';
import { Category } from '../../shared/model/category';
import { GameDataService } from '../services/game-data.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    SelectGameCategoryDialogComponent,
  ],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent implements OnInit {
  @Input() currentGame?: GameProfile;
  @Input() currentCate?: Category;
  allCate: Category[] = [];
  allgames: GameProfile[] = [];
  GamePicked = [];
  constructor(
    public dialogService: MatDialog,
    private gameDataService: GameDataService,
    private categoryService: CategoriesService
  ) // private dialogRef : MatDialogRef<GameCardComponent>,
  {}

  ngOnInit(): void {
    this.categoryService.list().then((result:Category[]) => (this.allCate = result));
    this.allgames = this.gameDataService.list();
  }

  openDialog(currentGame: GameProfile) {
    const dialogRef = this.dialogService.open(
      SelectGameCategoryDialogComponent,
      {
        data: currentGame,
      }
    );
  }
}
