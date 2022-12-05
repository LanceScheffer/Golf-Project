import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY08rtVT_CSwpEGIl0nBzbmB2l1aPrae0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
     )
      //The pipe method of the Angular Observable is used to chain multiple operators together. examples: catchError,throwError,handleError
      //The tap allows us to perform an action without changing the response
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
          )
          })
          );
        }

        login(email: string, password: string) {
          return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY08rtVT_CSwpEGIl0nBzbmB2l1aPrae0',
            {
              email: email,
              password: password,
              returnSecureToken: true
            }
          )
            .pipe(catchError(this.handleError),
             tap(resData => {
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
                )
                })
          );
         }
    // the snapshot that's being retrieved here in autoLogin is a string because we saved it as a string
      //  below with JSON.stringify. In order to use as JavaScript object we convert it back with JSON.parse
    // JSON.parse will take the string in JSON format and convert it back to a Javascript object.
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expiratiionDuration =
         new Date(userData._tokenExpirationDate).getTime() -
         new Date().getTime()
        this.autoLogout(expiratiionDuration);
      }
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration)
   this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
//This handleAuthentication() method allows us to store new user id
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn *1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }
 //the hanleError() method handles authentication errors and displays appropriate response
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
  }
        //This switch checks for which type of errorResponse we are getting, in this case
  // it is EMAIL_EXISTS. We give this.error a string which displays 'This email exists already'.
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already.';
        break;
     case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email address does not exist on our database. If you are a new member, click the blue Sign up button below.';
        break;
     case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
        break;
  }
  return throwError(errorMessage);
 }
}
