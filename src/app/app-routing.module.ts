import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BettingComponent } from './Components/betting/betting.component';
import { ResultsComponent } from './Components/results/results.component';

const routes: Routes = [
  {path:'', component:BettingComponent},
  {path:'result', component:ResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
