import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mode } from '../interfaces/mode';
import { Status } from '../interfaces/status';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  static ALARM_MODE = `https://674531d6b4e2e04abea50775.mockapi.io/alarm-mode`;
  static ALARM_STATUS = `https://6317ca93f6b281877c5d7785.mockapi.io/alarm-status`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAlarmModes(): Observable<Mode[]> {
    return this.http.get<Mode[]>(PanelService.ALARM_MODE + '?userId=userId ' + this.loginService.user?.id);
  }

  createAlarmMode(mode: Mode): Observable<Mode> {
    return this.http.post<Mode>(PanelService.ALARM_MODE, mode);
  }

  getAlarmStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(PanelService.ALARM_STATUS);
  }

  createAlarmStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(PanelService.ALARM_STATUS, status);
  }
}
