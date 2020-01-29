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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    WordsComponent,
    WordDetailComponent,
    MessagesComponent,
    WordSearchComponent,
    WordModuleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
