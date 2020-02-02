import { Component } from '@angular/core';
import { AuthProvider } from '@firebaseui/ng-bootstrap';

import { Input } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'Learning Words';
	activeMenuTab = 'None';
	providers = AuthProvider;
}

