import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterModule, MatButtonModule],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDialogComponent {
  currentPlayed?: [];
  trueCase: any;
  falseCase: any;

  constructor(@Inject(MAT_DIALOG_DATA) public isSucces: boolean) {}
}
