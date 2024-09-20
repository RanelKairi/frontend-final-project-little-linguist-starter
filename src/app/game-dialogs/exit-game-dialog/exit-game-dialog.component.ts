import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-game-dialog',
  standalone: true,
  imports: [
    CommonModule,MatDialogModule,MatIconModule,MatButtonModule,RouterModule
  ],
  templateUrl: './exit-game-dialog.component.html',
  styleUrl: './exit-game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitGameDialogComponent {
  
 }
