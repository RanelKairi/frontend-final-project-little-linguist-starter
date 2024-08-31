import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AllGamesService } from '../services/all-games.service';
import { GamePlayed } from '../../shared/model/game-played.';
import { MatTableModule } from '@angular/material/table';

@Component({
  
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatTableModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
 @Input() 
 id?:number;
  displayedColumns:string[] = [
    'id',
  ]

  dataSource: GamePlayed[] = [];

  constructor(private allGamesdataService: AllGamesService) {}
  ngOnInit(): void {
    this.dataSource = this.allGamesdataService.list();
}}
