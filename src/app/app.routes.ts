import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { TwoGamesComponent } from './two-games/two-games.component';
import { HelpComponent } from './help/help.component';
import { MixedLettersComponent } from './Games/mixedLetters/mixedLetters.component';
import { PairOfWordsComponent } from './Games/PairOfWords/PairOfWords.component';
import { SelectGameCategoryDialogComponent } from './select-game-category-dialog/select-game-category-dialog.component';
import { Component, NgModule } from '@angular/core';
import { MixdrixComponent } from './Games/mixdrix/mixdrix.component';
import { Mix3TryComponent } from './Games/mix-3-try/mix-3-try.component';
import { ScoreComponent } from './score/score.component';
import { MixxedLettersComponent } from './Games/mixxed-letters/mixxed-letters.component';

export const routes: Routes = [
  { path: 'categories-list', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: '', component: DashboardComponent },
  { path: 'choose-game', component: ChooseGameComponent },
  { path: 'two-game', component: TwoGamesComponent },
  { path: 'help', component: HelpComponent },
  { path: 'Games/mixedLetters/:id', component: MixedLettersComponent },
  { path: 'Games/PairOfWords/:id', component: PairOfWordsComponent },
  { path: 'Games/mix-drix/:id', component: MixdrixComponent },
  { path: 'Games/mix-3-try/:id', component: Mix3TryComponent },
  { path: 'Games/mixxed-letters/:id', component: MixxedLettersComponent },
  { path: 'select-game-category-dialog', component: SelectGameCategoryDialogComponent,
  },
  {path: 'score/:id/:y', component:ScoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
