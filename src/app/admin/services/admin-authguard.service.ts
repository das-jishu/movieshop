import { CanActivate } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireObject } from '@angular/fire/database/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthguardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService ) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map(appUser => appUser.isAdmin));
  }
}
