import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import 'crypto-js/lib-typedarrays';
import Amplify, { Auth } from 'aws-amplify';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;
  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
   }

   public signIn(user: any): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo()
    .then((res) => {
      console.log('Here are the current user info! =>', res);
    })
    .catch((err) => {
      console.log('Current user info failed to fetch', err);
    });
  }

  public updateUser(user:any): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

  public signUp(user:any): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user:any): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }
}
