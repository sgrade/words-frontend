import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    user: User;
    user$: Observable<User | null>;

    constructor(public afa: AngularFireAuth) { }
    
    getToken() {
        
        this.user$ = this.afa.user;
        this.user$.subscribe((user: User) => {
            this.user = user;
        
            // ?true if you want to force token refresh?
            this.user.getIdToken(false).then(
                (token) => console.log(`Token: ${token}`));
        });
    }
}
