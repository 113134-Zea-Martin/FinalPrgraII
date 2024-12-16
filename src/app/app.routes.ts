import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { loginGuard } from './guards/login.guard';
import { PanelComponent } from './components/panel/panel.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';

export const routes: Routes = [
    { path: '', component: LoginComponent }, // Reemplazar PanelComponent por LoginComponent
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomeComponent, canActivate: [loginGuard], children: [
            { path: '', redirectTo: 'panel', pathMatch: 'full' },
            { path: 'panel', component: PanelComponent },
            { path: 'nuevo', component: NuevoComponent }
        ]
    }
];
