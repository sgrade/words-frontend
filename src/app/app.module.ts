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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAuthFirebaseUIModule } from '@firebaseui/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
	  NgbAuthFirebaseUIModule.forRoot({
		  apiKey: 'AIzaSyD6shTFtvllk7xiOuRe4uqFG6jNLJRTCdI',
		  projectId: 'words-68f00'
	  }),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    WordsComponent,
    WordDetailComponent,
    MessagesComponent,
    WordSearchComponent,
    WordModuleComponent,
    AuthComponent
  ],
    bootstrap: [AppComponent],
    entryComponents: [AuthComponent],
})
export class AppModule { }
