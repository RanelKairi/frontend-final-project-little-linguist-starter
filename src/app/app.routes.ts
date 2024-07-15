import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { TwoGamesComponent } from './two-games/two-games.component';
import { HelpComponent } from './help/help.component';

export const routes: Routes = [
    {path: "", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'choose-game', component: ChooseGameComponent},
    {path: 'two-game', component: TwoGamesComponent},
    {path: 'help', component: HelpComponent},
];
