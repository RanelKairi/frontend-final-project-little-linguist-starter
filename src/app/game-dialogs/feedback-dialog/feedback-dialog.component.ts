import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject,NgModule, OnInit } from '@angular/core';
import { GamePlayed } from '../../../shared/model/game-played.';
import { GameDataService } from '../../services/GameData.service';
import { AllGamesService } from '../../services/all-games.service';
import { MatDialogActions, MatDialogContent, MatDialogModule ,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    NgIf

  ],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDialogComponent implements OnInit{
  currentPlayed?:[]
  currentGamesPlayed? :GamePlayed;
  allGamesPlayed : GamePlayed[] = [];
  trueCase=`<div class = "true">`;
  falseCase=``
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public isSucces : boolean,
    private allGameService : AllGamesService
  ){}
  
  
  ngOnInit(): void {
    console.log(this.isSucces)
    if(this.isSucces!){
      
    }
  }
}
