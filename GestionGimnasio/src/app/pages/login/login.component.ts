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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SelectRoleDialogComponent } from '../../components/select-role-dialog.component';


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
    MatDialogModule,

    
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide = true;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}
 login() {
    const credenciales: UsuarioLoginRequest = {
      usuario: this.email,
      contrasena: this.password
    };

    this.authService.login(credenciales).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);

        localStorage.setItem('token', res.token);
        localStorage.setItem('nombre', res.nombreEmpleado);
        localStorage.setItem('apellidos', res.apellidosEmpleado);
        localStorage.setItem('lastAction', Date.now().toString());

        if (res.roles.length === 1) {
          localStorage.setItem('rol', res.roles[0]);
          this.router.navigate(['/dashboard']);
        } else {
          const dialogRef = this.dialog.open(SelectRoleDialogComponent, {
            disableClose: true,
            data: { roles: res.roles }
          });

          dialogRef.afterClosed().subscribe((rolSeleccionado: string) => {
            if (rolSeleccionado) {
              localStorage.setItem('rol', rolSeleccionado);
              this.router.navigate(['/dashboard']);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert(err.error);
      }
    });
  }
}
