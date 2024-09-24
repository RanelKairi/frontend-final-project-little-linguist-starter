import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { HelpComponent } from './help/help.component';
import { Component, NgModule } from '@angular/core';
import { MixxedLettersComponent } from './Games/mixxed-letters/mixxed-letters.component';
import { WordSortingComponent } from './Games/word-sorting/word-sorting.component';
import { MessyWordComponent } from './Games/messy-word/messy-word.component';
import { ReversedCardsComponent } from './Games/reversed-cards/reversed-cards.component';
import { CardMatchingComponent } from './Games/card-matching/card-matching.component';

export const routes: Routes = [
  { path: 'categories-list', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: '', component: DashboardComponent },
  { path: 'choose-game', component: ChooseGameComponent },
  { path: 'help', component: HelpComponent },
  { path: 'Games/mixxed-letters/:id', component: MixxedLettersComponent },
  { path: 'Games/word-sorting/:id', component:WordSortingComponent},
  { path: 'Games/messy-words/:id', component:MessyWordComponent},
  { path: 'Games/reversed-cards/:id', component:ReversedCardsComponent},
  { path: 'Games/card-matching/:id', component:CardMatchingComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
