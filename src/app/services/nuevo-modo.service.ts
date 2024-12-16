import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Zone } from '../interfaces/zone';
import { Mode } from '../interfaces/mode';

@Injectable({
  providedIn: 'root'
})
export class NuevoModoService {

  private static URL_MODES = `https://674531d6b4e2e04abea50775.mockapi.io/alarm-mode`;
  private static URL_ZONES = `https://674531d6b4e2e04abea50775.mockapi.io/alarm-zones`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  nameAvailable(name: string) {
    return this.http.get(`${NuevoModoService.URL_MODES}?userId=userId ${this.loginService.user?.id}&name=${name}`);
  }

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(NuevoModoService.URL_ZONES);
  }

  getUserID() {
    return this.loginService.user?.email;
  }

  createMode(mode: Mode): Observable<Mode> {
    return this.http.post<Mode>(NuevoModoService.URL_MODES, mode);
  }

}
