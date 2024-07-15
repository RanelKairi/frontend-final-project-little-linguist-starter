import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent { }
