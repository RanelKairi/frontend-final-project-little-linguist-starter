import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/game-profile';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectGameCategoryDialogComponent } from '../select-game-category-dialog/select-game-category-dialog.component';

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
})
export class GameCardComponent //implements OnInit
 {
  @Input() currentGame?: GameProfile;
  allgames: GameProfile[] = [];
  GamePicked = [];
  constructor(
    public dialogService: MatDialog,
  ) {}
  
  openDialog(currentGame: GameProfile) {
    this.dialogService.open(SelectGameCategoryDialogComponent, {
      data: currentGame,
    });
  }
}
