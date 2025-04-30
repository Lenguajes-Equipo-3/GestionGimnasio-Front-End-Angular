import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // ✅ Necesario
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule, // ✅ IMPORTANTE
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedRole: string = 'admin';
  roles: string[] = ['admin', 'usuario'];
  email: string = '';
  password: string = '';
  hide = true;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.selectedRole);
    this.router.navigate(['/dashboard']);
  }
}
