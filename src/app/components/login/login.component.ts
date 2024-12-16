import { Component, OnDestroy } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LoginService } from "../../services/login.service";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  constructor(private loginService: LoginService, private router: Router) { }

  //   - **Email**: Debe tener el siguiente formato: `usuario@homesafe.io`.
  // - **Contraseña**: Debe cumplir con las siguientes condiciones:
  //   - Al menos 10 caracteres.
  //   - Contar con 1 mayúscula.
  //   - Contar con 1 minúscula.
  //   - Contar con al menos 1 carácter especial.
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{10,}$')])
  });

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.subscriptions.push(this.loginService.validateLogin(email, password).subscribe(
      {
        next: users => {
          if (users.length > 0) {
            this.loginService.setUser(users[0]);
            this.router.navigate(['/home']);
          } else {
            alert('Usuario y/o contraseña incorrectos');
          }
        },
        error: error => {
          console.error(error);
          alert('Usuario y/o contraseña incorrectos');
        }
      }
    ));
  }
}
