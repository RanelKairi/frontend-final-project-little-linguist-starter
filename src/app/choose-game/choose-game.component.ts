import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category } from '../../shared/model/categories/category';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameProfile } from '../../shared/model/games/game-profile';
import { GameDataService } from '../services/game-services/game-data.service';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [CommonModule, GameCardComponent, MatCardModule, DashboardComponent],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {
  allGames: GameProfile[] = [];
  allCate: Category[] = [];

  constructor(private gameService: GameDataService) {}

  ngOnInit(): void {
    this.allGames = this.gameService.list();
  }
}
