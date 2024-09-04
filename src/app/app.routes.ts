import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { TwoGamesComponent } from './two-games/two-games.component';
import { HelpComponent } from './help/help.component';
import { Component, NgModule } from '@angular/core';
import { MixxedLettersComponent } from './Games/mixxed-letters/mixxed-letters.component';

export const routes: Routes = [
  { path: 'categories-list', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: 'dashborad', component: DashboardComponent },
  { path: '', component: ChooseGameComponent },
  { path: 'two-game', component: TwoGamesComponent },
  { path: 'help', component: HelpComponent },
  { path: 'Games/mixxed-letters/:id', component: MixxedLettersComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
