import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of, map, catchError, Subscription } from 'rxjs';
import { NuevoModoService } from '../../services/nuevo-modo.service';
import { CommonModule } from '@angular/common';
import { Zone } from '../../interfaces/zone';
import { Router } from '@angular/router';
import { Mode } from '../../interfaces/mode';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  //Metodo que redirige al componente de panel
  cancel() {
    this.router.navigate(['/home/panel']);
  }

  mode: Mode = {
    userId: '',
    name: '',
    zones: [],
    creationDate: Date.now(),
    id: '',
  };
  //Metodo que crea un nuevo modo y lo guarda en la base de datos
  guardar() {
    if (this.nuevoModoForm.invalid) {
      return;
    }

    //Crear un nuevo modo
    this.mode.userId = 'userId ' + this.loginService.user?.id || '';
    this.mode.name = this.nuevoModoForm.value.nombre;
    // cargar los nombres de las zonas seleccionadas (el value del select)
    // Encontrar la zona en el array de zonas que ha seleccionado el usuario
    // Guardar el id de la zona
    this.mode.zones = this.nuevoModoForm.value.zonas.map((zona: { zone: string }) => {
      const selectedZone = this.zones.find((zone) => zone.id === zona.zone);
      return selectedZone?.name || '';
    });
    this.mode.creationDate = Date.now();
    this.mode.id = '';

    //Guardar el modo en la base de datos
    this.subscriptions.push(
      this.nuevoModoService.createMode(this.mode).subscribe((mode) => {
        console.log('Modo creado:', mode);
        this.router.navigate(['/home/panel']);
      })
    );    
    
  }

  constructor(private nuevoModoService: NuevoModoService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loadZones();
    this.loadUserId();
  }

  userId?: string;

  loadUserId() {
    this.userId = this.nuevoModoService.getUserID();
    if (this.userId) {
      this.nuevoModoForm.patchValue({ usuario: this.userId });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  nuevoModoForm: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)], [this.checkNameValidator()]),
    zonas: new FormArray([], [Validators.required, this.checkSameZonesValidator()]),
  });

  get zonasFormArray() {
    return this.nuevoModoForm.get('zonas') as FormArray;
  }

  addZona() {
    const zona = new FormGroup({
      zone: new FormControl('', [Validators.required]),
    });
    this.zonasFormArray.push(zona);
  }

  removeZona(index: number) {
    this.zonasFormArray.removeAt(index);
  }

  //   **Validaciones del formulario:**
  // - Mostrar un mensaje de error si existe un modo con el mismo nombre para el usuario que ingresó al sistema.
  // - No permitir cargar dos zonas iguales.

  // checkDNIAvailability(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     const dni = control.value;

  //     if (!dni) {
  //       return of(null);
  //     }

  //     return this.apiService.getAvailability(dni).pipe(
  //       map((response) => {
  //         if (Array.isArray(response) && response.length > 0) {
  //           return { dniUsed: true };
  //         }
  //         return null;
  //       }),
  //       catchError((error) => {
  //         if (error.status === 404) {
  //           return of(null);
  //         }
  //         console.error('Error al verificar disponibilidad del DNI:', error);
  //         return of({ apiError: true });
  //       })
  //     );
  //   };
  // }
  checkNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.value;

      if (!name) {
        return of(null);
      }

      return this.nuevoModoService.nameAvailable(name).pipe(
        map((response) => {
          if (Array.isArray(response) && response.length > 0) {
            console.log('Nombre de modo ya utilizado');
            return { nameUsed: true };
          }
          return null;
        }),
        catchError((error) => {
          if (error.status === 404) {
            return of(null);
          }
          console.error('Error al verificar disponibilidad del nombre:', error);
          return of({ apiError: true });
        })
      );
    };
  }

  //   **Validaciones del formulario:**
  // - No permitir cargar dos zonas iguales.
  checkSameZonesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const zones = control.value;

      if (!zones) {
        return null;
      }

      const zoneNames = zones.map((zone: { zone: string }) => zone.zone);
      const uniqueZoneNames = [...new Set(zoneNames)];

      if (zoneNames.length !== uniqueZoneNames.length) {
        console.log('Zonas repetidas');
        return { sameZones: true };
      }

      return null;
    };
  }

  zones: Zone[] = [];
  loadZones() {
    this.nuevoModoService.getZones().subscribe((zones) => {
      this.zones = zones;
    });
  }

}
