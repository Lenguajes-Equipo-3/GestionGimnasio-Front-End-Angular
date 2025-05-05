import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { UsuarioLoginRequest } from '../../Domain/usuario-login-request';
 // ✅ IMPORTA TU MODELO

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide = true;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credenciales: UsuarioLoginRequest = {
      usuario: this.email,
      contrasena: this.password
    };

    this.authService.login(credenciales).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert(err.error);
      }
    });
  }
}
