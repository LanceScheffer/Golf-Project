import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    //this Observable is of generic type which means we have to identify which type of <Data> it needs eventually
    //A push system for JavaScript, An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers)
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    //If statement checks to see which of these 2 observables(login,signup) will be stored in authObs, therefore subscribing to it is
    //safe. Then we control the loading state and set the error
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    //Once authenticated you are routed to homepage
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/homepage']);
    },
    errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    }
    );
    form.reset();
  }


}
