import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameProfile } from '../../shared/model/game-profile';
import { GameDataService } from '../services/game-data.service';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
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
