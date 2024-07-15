import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-two-games',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './two-games.component.html',
  styleUrl: './two-games.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoGamesComponent { }
