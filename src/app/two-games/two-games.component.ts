import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Category } from '../../shared/model/category';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-two-games',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './two-games.component.html',
  styleUrl: './two-games.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoGamesComponent { }
