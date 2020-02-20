import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WordDetailComponent } from './word-detail/word-detail.component';
import { WordsComponent } from './words/words.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';

import { WordSearchComponent } from './word-search/word-search.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordModuleComponent } from './word-module/word-module.component';
import { MatDashboardComponent } from './mat-dashboard/mat-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { NgxAuthFirebaseuiComponent } from './ngx-auth-firebaseui/ngx-auth-firebaseui.component';

import { firebaseConfig } from '../../firebase-config';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    NgxAuthFirebaseUIModule.forRoot(
        firebaseConfig,
        () => '',
        {
            // url for unauthenticated users - to use in combination with canActivate feature on a route
            authGuardFallbackURL: '/signin',
            // url for authenticated users - to use in combination with canActivate feature on a route
            authGuardLoggedInURL: '/dashboard',
            // Plus protected routes are still protected even though user is connected.
            guardProtectedRoutesUntilEmailIsVerified: true,
        }
        ),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    WordsComponent,
    WordDetailComponent,
    MessagesComponent,
    WordSearchComponent,
    WordModuleComponent,
    MatDashboardComponent,
    SidebarComponent,
    NgxAuthFirebaseuiComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
