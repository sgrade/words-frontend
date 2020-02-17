import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngx-auth-firebaseui',
  templateUrl: './ngx-auth-firebaseui.component.html',
  styleUrls: ['./ngx-auth-firebaseui.component.css']
})
export class NgxAuthFirebaseuiComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
  
    printUser(event) {
        console.log('Executing printUser');
        console.log(event);
    }

    printError(event) {
        console.log('Executing printError');
        console.error(event);
    }
}
