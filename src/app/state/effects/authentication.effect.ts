import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  AuthenticationActionType,
  LogIn,
  LogInFailure,
  LogInSuccess,
  SignUp,
  SignUpFailure,
  SignUpSuccess
} from '../actions/authentication.action';

import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { Toaster } from 'ngx-toast-notifications';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toaster: Toaster
  ) {
  }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.LOGIN),
    map((action: LogIn) => action.payload),
    exhaustMap(payload => {
        return this.authenticationService.logIn(payload.email, payload.password).pipe(
          tap(bal => console.log('baal', bal)),
          map(user => new LogInSuccess({ user })),
          catchError(error => of(new LogInFailure({ error })))
        );
      }
    ));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.LOGIN_SUCCESS),
    tap((user) => {
      this.toaster.open('Successfully Logged in!');

      this.router.navigateByUrl('/todo');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.LOGIN_FAILURE),

    // FIXME: Remove hardcoded string
    tap(response => this.toaster.open('Wrong username or password')
    )
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.SIGNUP),
    map((action: SignUp) => action.payload),
    exhaustMap(payload => {
        return this.authenticationService.signUp(payload).pipe(
          tap(bal => console.log('baal', bal)),
          map(user => new SignUpSuccess({ user })),
          catchError(error => of(new SignUpFailure({ error })))
        );
      }
    ));

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.SIGNUP_SUCCESS),
    tap((user) => {
      this.toaster.open('Successfully Registered!');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.SIGNUP_FAILURE),
    tap(response => {
        this.toaster.open(response.payload.error.toString());
      }
    )
  );
}
