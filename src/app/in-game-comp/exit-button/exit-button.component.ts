import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ExitGameDialogComponent } from '../../game-dialogs/exit-game-dialog/exit-game-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-exit-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './exit-button.component.html',
  styleUrl: './exit-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitButtonComponent {
  constructor(public dialogService: MatDialog) {}

  exitDialog() {
    this.dialogService.open(ExitGameDialogComponent);
  }
}
