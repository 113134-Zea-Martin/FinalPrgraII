import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static URL_USERS = 'https://6317ca93f6b281877c5d7785.mockapi.io/users';

  constructor(private http: HttpClient) { }

  public user: User | undefined;

  validateLogin(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${LoginService.URL_USERS}?email=${email}&password=${password}`);
  }

  setUser(user: User) {
    this.user = user;
    console.log('user', user);
    console.log('id', user.id);
  }

  getUser(): Observable<User | undefined> {
    return new Observable<User | undefined>(subscriber => {
      subscriber.next(this.user);
      subscriber.complete();
    }
    );
  }

  logout() {
    this.user = undefined;
  }
}
