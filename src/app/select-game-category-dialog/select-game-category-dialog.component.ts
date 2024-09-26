import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { GameProfile } from '../../shared/model/games/game-profile';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Category } from '../../shared/model/categories/category';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CatesService } from '../services/category-services/category.service';

@Component({
  selector: 'app-select-game-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    MatDialogModule,
  ],
  templateUrl: './select-game-category-dialog.component.html',
  styleUrl: './select-game-category-dialog.component.css',
})
export class SelectGameCategoryDialogComponent implements OnInit {
  currentCate?: Category;
  allCate: Category[] = [];
  GamePicked = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public currentGame: GameProfile,
    private categoryService: CatesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.categoryService
      .list()
      .then((result: Category[]) => (this.allCate = result));
  }
}
