import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-points',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './game-points.component.html',
  styleUrl: './game-points.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePointsComponent { }
