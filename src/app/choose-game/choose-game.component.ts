import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent { }
