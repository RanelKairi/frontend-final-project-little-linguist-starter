import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AllGamesService } from '../services/all-games.service';
import { GamePlayed } from '../../shared/model/game-played.';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ScoreService } from '../services/score.service';
import { GameScoreData } from '../../shared/model/game-score-data.';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
  displayedColumns: string[] = [
    'words',
    'wordResults',
    
    
  ];
  
  dataaSource?: GameScoreData;
  dataSourceStr!: string;
  dataSource: MatTableDataSource<GameScoreData> = new MatTableDataSource();
  
  constructor(
    private scoreService: ScoreService,
    private allGamesdataService: AllGamesService
  ) {}
  ngOnInit(): void {
    
    const gameScore = this.scoreService.getScore();
    if(gameScore){
      console.log("jehri")
      this.scoreService.setScore(gameScore)
      this.dataaSource = this.scoreService.getScore()
      console.log(this.dataaSource)
      // for(let x = 0; x<1 ;x++){
      //   window.location.reload()
      // }
    //new MatTableDataSource<GameScoreData>([gameScore]);
  }else{

    console.error('nogamescoredatafound')
  }
  }

  
}

//     if(this.id&&this.y){
//       console.log("score-comp-gameId",this.y,this.id);
//       const cateId = parseInt(this.id);
//       console.log(cateId)
//       const gameId = parseInt(this.y);
//       const gameIdstr = this.y
//       console.log("score-comp-gameId",gameId);
      // this.dataSource = this.allGamesdataService.list();

// {}      console.log(this.dataSource)

//       console.log(this.lastGamme)
//       this.dataSourceStr=JSON.stringify(this.dataSource);
//       const lastGame = this.allGamesdataService.get(parseInt(this.y));
//       console.log("score-comp-lastGame",lastGame);
//       // this.lastGameData = lastGame;
//     }else{
//       // window.location.reload();
//       console.log("notandnot")
//     }
