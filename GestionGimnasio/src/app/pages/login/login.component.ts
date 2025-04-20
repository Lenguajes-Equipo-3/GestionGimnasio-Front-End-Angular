import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Asegúrate de importarlo
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatIconModule  
  ],    
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedRole: string = 'admin'; // Valor por defecto
  roles: string[] = ['admin', 'usuario']; // Opciones disponibles para el rol
  email: string = '';
  password: string = '';
  hide = true;
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (true) {  // Validación básica del rol
      this.authService.login(this.selectedRole); // Guardar el rol
      this.router.navigate(['/dashboard']); // Redirigir a la página de dashboard después del login
    } else {
      alert('Rol inválido. Por favor, seleccione un rol válido.');
    }
  }
}
