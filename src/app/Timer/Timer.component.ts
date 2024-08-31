import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component , } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Timer.component.html',
  styleUrl: './Timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {

  getTimeLeft(){
    return 6.66
  }
 }
