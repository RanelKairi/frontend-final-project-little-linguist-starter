import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy,  Component,  Input,  OnInit,} from '@angular/core';
import { RouterModule,  RouterOutlet,  RouterLink,  ActivatedRoute,} from '@angular/router';
import { GameProfile } from '../../../shared/model/GameProfile';
import { SelectGameCategoryDialogComponent } from '../../select-game-category-dialog/select-game-category-dialog.component';
import { Category } from '../../../shared/model/category';
import { CategoriesService } from '../../services/categories.service';
import { GameDataService } from '../../services/GameData.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GameRandomService } from '../../services/game-random.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-pair-of-words',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterOutlet,
    SelectGameCategoryDialogComponent,
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  templateUrl: './PairOfWords.component.html',
  styleUrl: './PairOfWords.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PairOfWordsComponent implements OnInit {
  categoryId = 0;
  selectedCategory?: Category;
  selectedGame?: GameProfile;
  allGames: GameProfile[] = [];

  constructor(
    private route: ActivatedRoute,
    private CategoryService: CategoriesService,
    private GameDataService: GameDataService,
    private randomService : GameRandomService,
    public dialogService : MatDialog
  ) {}

  ngOnInit(): void {
    this.allGames = this.GameDataService.list();
    this.selectedGame = this.allGames[0];

    this.route.paramMap.subscribe((params) => {
      this.categoryId = +params.get('id')!;
      this.fetchCategoryDetails();
    });
  }
  fetchCategoryDetails(): void {
    this.selectedCategory = this.CategoryService.get(this.categoryId);
  }
}
