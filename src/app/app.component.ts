import { Component } from '@angular/core';
import { AuthProvider } from '@firebaseui/ng-bootstrap';

import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Learning Words';
  providers = AuthProvider;
  activeMenuTab;

  links = [
    { title: 'Play', fragment: 'dashboard' },
    { title: 'Manage words', fragment: 'words' },
    { title: 'Login', fragment: 'auth' }
  ];
  constructor(public route: ActivatedRoute) {

    // If I manually type non-default url in the browser's address bar, e.g. ../words, then the first nav tab still active
    // To choose current active router tab, the following is used in the template
    // routerLinkActive="active"
    // However, ngbNav still chooses first tab as default, so two tabs are selected as active 
    // (one by the router and one by ngbNav). 
    // To help ngbNav choose proper tab, the following is added 
    this.activeMenuTab = route.outlet;
  }

}

