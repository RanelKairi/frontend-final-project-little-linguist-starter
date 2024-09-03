import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject,NgModule, OnInit } from '@angular/core';
import { GamePlayed } from '../../../shared/model/game-played.';
import { GameDataService } from '../../services/GameData.service';
import { AllGamesService } from '../../services/all-games.service';
import { MatDialogActions, MatDialogContent, MatDialogModule ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    NgIf,
    RouterModule,
    MatButtonModule

  ],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDialogComponent{
  currentPlayed?:[]
  currentGamesPlayed? :GamePlayed;
  allGamesPlayed : GamePlayed[] = [];
  trueCase: any;
  falseCase:any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public isSucces : boolean,
    private allGameService : AllGamesService
  ){}
  
}