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
import { NgModule } from '@angular/core';
import { MixdrixComponent } from './Games/mixdrix/mixdrix.component';

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
  { path: 'Games/mix-drix/:id', component:MixdrixComponent },
  {path : 'select-game-category-dialog', component: SelectGameCategoryDialogComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}