import {Component, OnInit} from '@angular/core';
import {AuthProvider} from '@firebaseui/ng-bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  providers = AuthProvider;

  ngOnInit() {
  }
}
