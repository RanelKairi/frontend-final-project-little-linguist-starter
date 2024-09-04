import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game-points',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    
  ],
  templateUrl: './game-points.component.html',
  styleUrl: './game-points.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePointsComponent { 
  @Input() grade:number = 0
}
