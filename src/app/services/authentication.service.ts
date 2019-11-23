import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserType } from '../interfaces/user.interface';

@Injectable()
export class AuthenticationService {
  constructor() {
  }

  logIn(email: string, password: string): Observable<UserType> {
    const users: UserType[] = JSON.parse(localStorage.getItem('users')) || [];

    let returnUser: UserType;
    users.forEach(user => {
      if (user.email === email && user.password === password) {
        returnUser = user;
      }
    });

    if (returnUser) {
      return of(returnUser);
    } else {
      return throwError('Login Failed');
    }
  }

  signUp(user: UserType): Observable<UserType> {
    try {
      const users: UserType[] = JSON.parse(localStorage.getItem('users')) || [];
      console.log(users);
      const isEmailAlreadyTaken = users.some(item => item.email === user.email);
      if (isEmailAlreadyTaken) {
        throw Error('Email already taken');
      }

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return of(user);
    } catch (e) {
      return throwError(e);
    }
  }
}
