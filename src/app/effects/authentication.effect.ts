import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
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
} from '../../actions/authentication.action';
import { AuthenticationService } from '../services/authentication.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { Toaster } from 'ngx-toast-notifications';

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
        console.log('payLoad is', payload);

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

      //  localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/todo');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.LOGIN_FAILURE),
    tap(msg => this.toaster.open('Wrong username or password')
    )
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.SIGNUP),
    map((action: LogIn) => action.payload),
    exhaustMap(payload => {
        console.log('payLoad is', payload);

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

      //  localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/login');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionType.SIGNUP_FAILURE),
    tap(msg => {
      console.log(msg);
        this.toaster.open('Please try again');
    }
    )
  );

  // @Effect()
  // SignUp: Observable<any> = this.actions
  //   .ofType(AuthActionTypes.SIGNUP)
  //   .map((action: SignUp) => action.payload)
  //   .switchMap(payload => {
  //     return this.authService.signUp(payload.email, payload.password)
  //       .map((user) => {
  //         return new SignUpSuccess({token: user.token, email: payload.email});
  //       })
  //       .catch((error) => {
  //         return Observable.of(new SignUpFailure({ error: error }));
  //       });
  //   });
  //
  // @Effect({ dispatch: false })
  // SignUpSuccess: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.SIGNUP_SUCCESS),
  //   tap((user) => {
  //     localStorage.setItem('token', user.payload.token);
  //     this.router.navigateByUrl('/');
  //   })
  // );
  //
  // @Effect({ dispatch: false })
  // SignUpFailure: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.SIGNUP_FAILURE)
  // );
  //
  // @Effect({ dispatch: false })
  // public LogOut: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.LOGOUT),
  //   tap((user) => {
  //     localStorage.removeItem('token');
  //   })
  // );
  //
  // @Effect({ dispatch: false })
  // GetStatus: Observable<any> = this.actions
  //   .ofType(AuthActionTypes.GET_STATUS)
  //   .switchMap(payload => {
  //     return this.authService.getStatus();
  //   });
}
