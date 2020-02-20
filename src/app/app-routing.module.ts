import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Old dashboard - saved for reference
// import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDashboardComponent } from './mat-dashboard/mat-dashboard.component';

import { WordsComponent } from './words/words.component';
import { WordDetailComponent } from './word-detail/word-detail.component';

// https://ngx-auth-firebaseui.firebaseapp.com/
import { NgxAuthFirebaseuiComponent } from './ngx-auth-firebaseui/ngx-auth-firebaseui.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

const routes: Routes = [
  { path: 'dashboard', component: MatDashboardComponent },
  { path: 'detail/:id', component: WordDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'words', component: WordsComponent, canActivate: [LoggedInGuard] },
  { path: 'signin', component: NgxAuthFirebaseuiComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
