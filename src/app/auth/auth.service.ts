import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, tap } from "rxjs";
import { throwError } from 'rxjs';
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
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

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
