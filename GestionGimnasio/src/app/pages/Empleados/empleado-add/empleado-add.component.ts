import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Empleado } from '../../../Domain/Empleado.interface';
import { Rol } from '../../../Domain/Rol.interface';
import { EmpleadoService } from '../../../services/empleado.service';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-empleado-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './empleado-add.component.html',
  styleUrls: ['./empleado-add.component.css']
})
export class EmpleadoAddComponent implements OnInit {
  empleadoForm: FormGroup;
  roles: Rol[] = [];
  isEditMode = false;
  empleadoId: number | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    public dialogRef: MatDialogRef<EmpleadoAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empleadoForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.maxLength(100)]],
      contrasena: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      nombreEmpleado: ['', [Validators.required, Validators.maxLength(50)]],
      apellidosEmpleado: ['', [Validators.required, Validators.maxLength(50)]],
      rolId: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.empleadoService.getRoles()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
           this.roles = data.map(backendRol => {
             const backendIdValue = (backendRol as any)['rolId'];
             const frontendRol: Rol = {
               idRol: backendIdValue !== undefined && backendIdValue !== null ? Number(backendIdValue) : undefined,
               nombreRol: backendRol.nombreRol
             };
             return frontendRol;
           });
        },
        error: (err) => this.handleError(err, 'cargar roles')
      });
  }

  onSubmit(): void {
    if (this.empleadoForm.invalid) {
       Object.values(this.empleadoForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errorMessage = 'Por favor, complete todos los campos requeridos correctamente.';
      return;
    }
    this.errorMessage = null;
    this.saveEmpleado();
  }

  saveEmpleado(): void {
    this.isLoading = true;
    const empleadoData: Empleado = { ...this.empleadoForm.value };
    this.empleadoService.createEmpleado(empleadoData)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (response) => {
            this.dialogRef.close(true);
          },
          error: (err) => this.handleError(err, 'guardar empleado')
        });
  }


  onCancel(): void {
    this.dialogRef.close(false);
  }

  private handleError(err: any, action: string): void {
      console.error(`Error al ${action}:`, err);
      const detail = err?.error?.message || err?.message || 'Error desconocido';
      this.errorMessage = `Error al ${action}. Detalle: ${detail}. Por favor, intente de nuevo.`;
  }

  get nombreUsuario() { return this.empleadoForm.get('nombreUsuario'); }
  get contrasena() { return this.empleadoForm.get('contrasena'); }
  get nombreEmpleado() { return this.empleadoForm.get('nombreEmpleado'); }
  get apellidosEmpleado() { return this.empleadoForm.get('apellidosEmpleado'); }
  get rolId() { return this.empleadoForm.get('rolId'); }
}