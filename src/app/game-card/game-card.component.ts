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
import { GameDataService } from '../services/GameData.service';
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
  @Input() currentGame? :GameProfile;
  // currentGame?: GameProfile;
  // currentCate? : Category;
  @Input() currentCate? : Category;
  allCate: Category[] = [];
  allgames: GameProfile[] = [];
  GamePicked = [];
  constructor(
    public dialogService: MatDialog,
    private GameDataService: GameDataService,
    private CategoriesService: CategoriesService,
    // private dialogRef : MatDialogRef<GameCardComponent>,
  )
  {}
  ngOnInit(): void {
    this.allCate = this.CategoriesService.list();
    this.allgames = this.GameDataService.list();
  }

  openDialog(currentGame: GameProfile) {
    let dialogRef = this.dialogService.open(SelectGameCategoryDialogComponent, {
      data: currentGame,
    });
    


    

    }

    
  }

