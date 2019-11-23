import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { UserType } from '../interfaces/user.interface';
import { errorObject } from 'rxjs/internal-compatibility';

@Injectable()
export class AuthenticationService {
  constructor() {
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<UserType> {
    const fakeUsers: UserType[] = [{
      email: 'saadnoors9@gmail.com',
      password: '123456',
      name: 'saadnoor'
    }
    ];
    const users: UserType[] = fakeUsers;
    // const users: any[] = localStorage.getItem('users');
    // console.log('THE USERS ARE', users);

    let returnUser: UserType;
    users.forEach(user => {
      if (user.email === email && user.password === password) {
        returnUser = user;
      }
    });

    if (returnUser) {
      return of(returnUser);
    } else {
      return throwError('FUCK THIS SHIT');
    }
  }

  // signUp(email: string, password: string): Observable<UserType> {
  //   const url = `${this.BASE_URL}/register`;
  //   return this.http.post<User>(url, { email, password });
  // }
  //
  // getStatus(): Observable<User> {
  //   const url = `${this.BASE_URL}/status`;
  //   return this.http.get<User>(url);
  // }
}
