import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { TwoGamesComponent } from './two-games/two-games.component';
import { SelectGameCategoryDialogComponent } from './select-game-category-dialog/select-game-category-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    ChooseGameComponent,
    DashboardComponent,
    HelpComponent,
    TwoGamesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'little-linguist';
}
