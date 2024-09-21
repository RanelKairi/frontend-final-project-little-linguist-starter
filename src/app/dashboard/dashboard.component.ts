import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameResult } from '../../shared/model/game-result.';
import { GameResultsService } from '../services/game-results.service';
import { MatCardModule } from '@angular/material/card';
// amood habait
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,MatIconModule,MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit{
  gameResults: GameResult[] = [];  // Store all game results
  constructor(private gameResultsService: GameResultsService) {}


  async ngOnInit():Promise<void> {
    this.gameResults = await this.gameResultsService.list();
    console.log('Game results:', this.gameResults);  // For debugging

    
  }
  
 }
