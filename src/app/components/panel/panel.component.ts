import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Mode } from "../../interfaces/mode";
import { Status } from "../../interfaces/status";
import { LoginService } from "../../services/login.service";
import { PanelService } from "../../services/panel.service";


@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit, OnDestroy {

  constructor(private panelService: PanelService, private loginService: LoginService) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.getAlarmModes();
    this.getAlarmStatus();

    const sus = this.group.get('mode')?.valueChanges.subscribe((value) => {
      const mode = this.alarmModes.find((m) => m.id === value);
      if (mode) {
        const status = this.alarmsStatus.find((s) => s.modeId === mode.id);
        if (status) {
          this.alarmActive = status.activated;
          console.log('status', status);
          console.log('alarmActive', this.alarmActive);
        } else {
          this.alarmActive = false;
        }
      }
    });

    if (sus) {
      this.subscriptions.push(sus);
    }
  }

  group: FormGroup = new FormGroup({
    mode: new FormControl('', [Validators.required])
  });

  alarmModes: Mode[] = [];
  alarmsStatus: Status[] = [];
  alarmActive: boolean = false;
  subscriptions: Subscription[] = [];


  getAlarmModes() {
    const sus = this.panelService.getAlarmModes().subscribe({
      next: (modes) => this.alarmModes = modes,
      error: (error) => console.error(error)
    });
    this.subscriptions.push(sus);
  }

  //Get the alarm status and sort it by date (newest first)
  getAlarmStatus() {
    const sus = this.panelService.getAlarmStatus().subscribe({
      next: (status) => {
        this.alarmsStatus = status.sort((a, b) => new Date(b.lastUpdateDate ?? 0).getTime() - new Date(a.lastUpdateDate ?? 0).getTime());
        console.log('status', this.alarmsStatus);
      },
      error: (error) => console.error(error)
    });
    this.subscriptions.push(sus);
  }

  //create a new alarm status and post it to the server
  onSubmit() {
    const mode = this.alarmModes.find((m) => m.id === this.group.get('mode')?.value);
    if (mode) {
      const status: Status = {
        activated: !this.alarmActive,
        userId: this.loginService.user?.id ?? null,
        lastUpdateDate: new Date(),
        modeId: mode.id,
        id: ''
      };
      const sus = this.panelService.createAlarmStatus(status).subscribe({
        next: (savedStatus) => {
          // Actualizar la variable local `alarmActive` directamente
          this.alarmActive = savedStatus.activated;
          console.log('Nuevo estado guardado:', savedStatus);
        },
        error: (error) => console.error(error)
      });
      this.subscriptions.push(sus);
    }
  }
}
