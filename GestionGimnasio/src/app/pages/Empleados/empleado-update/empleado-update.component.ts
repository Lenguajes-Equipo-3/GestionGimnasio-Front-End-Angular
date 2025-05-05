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
  selector: 'app-empleado-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './empleado-update.component.html',
  styleUrls: ['./empleado-update.component.css']
})
export class EmpleadoUpdateComponent implements OnInit {
  empleadoForm: FormGroup;
  roles: Rol[] = [];
  empleadoId!: number;
  isLoading = false;
  errorMessage: string | null = null;
  originalUsername: string | null = null;
  originalIdUsuario: number | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    public dialogRef: MatDialogRef<EmpleadoUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empleado: Empleado }
  ) {
    if (!data || !data.empleado || data.empleado.idEmpleado === undefined) {
        this.empleadoForm = this.fb.group({});
         return;
    }

    this.empleadoId = data.empleado.idEmpleado;
    this.originalUsername = data.empleado.nombreUsuario;
    this.originalIdUsuario = data.empleado.idUsuario;

    this.empleadoForm = this.fb.group({
      nombreUsuario: [data.empleado.nombreUsuario, [Validators.required, Validators.maxLength(100)]],
      contrasena: ['', [Validators.minLength(4), Validators.maxLength(50)]],
      nombreEmpleado: [data.empleado.nombreEmpleado, [Validators.required, Validators.maxLength(50)]],
      apellidosEmpleado: [data.empleado.apellidosEmpleado, [Validators.required, Validators.maxLength(50)]],
      rolId: [data.empleado.rolId !== null && data.empleado.rolId !== undefined ? Number(data.empleado.rolId) : null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.empleadoService.getRoles()
      .pipe(finalize(() => this.isLoading = false ))
      .subscribe({
        next: (rolesData) => {
          this.roles = rolesData.map(backendRol => {
            const backendIdValue = (backendRol as any)['rolId'];
            const frontendRol: Rol = {
              idRol: backendIdValue !== undefined && backendIdValue !== null ? Number(backendIdValue) : undefined,
              nombreRol: backendRol.nombreRol
            };
            return frontendRol;
          });
          console.log('Roles cargados y procesados:', this.roles);
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
         console.error('Formulario inválido. Errores:', this.getFormValidationErrors());
         return;
     }
     this.errorMessage = null;
    this.updateEmpleado();
  }

  getFormValidationErrors() {
    const errors: any = {};
    Object.keys(this.empleadoForm.controls).forEach(key => {
      const controlErrors = this.empleadoForm.get(key)?.errors;
      if (controlErrors != null) {
        errors[key] = controlErrors;
      }
    });
    return errors;
  }


  updateEmpleado(): void {
    this.isLoading = true;
    const formValue = this.empleadoForm.value;

    const empleadoData = {
        idUsuario: this.originalIdUsuario,
        nombreUsuario: formValue.nombreUsuario,
        nombreEmpleado: formValue.nombreEmpleado,
        apellidosEmpleado: formValue.apellidosEmpleado,
        rolId: Number(formValue.rolId),
        contrasena: formValue.contrasena
    };

    console.log(`Actualizando empleado ID: ${this.empleadoId} con payload:`, empleadoData);

    this.empleadoService.updateEmpleado(this.empleadoId, empleadoData as Empleado)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (response) => {
            console.log('Empleado actualizado:', response);
            this.dialogRef.close(true);
          },
          error: (err) => this.handleError(err, 'actualizar empleado')
        });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private handleError(err: any, action: string): void {
      console.error(`Error al ${action}:`, err);
      const backendErrorMessage = err?.error?.message || err?.error?.error || err?.message;
      const detail = backendErrorMessage || 'Error desconocido';
      this.errorMessage = `Error al ${action}. Detalle: ${detail}.`;
      if (err.status) {
          this.errorMessage += ` (Código: ${err.status})`;
      }
  }

  get nombreUsuario() { return this.empleadoForm.get('nombreUsuario'); }
  get contrasena() { return this.empleadoForm.get('contrasena'); }
  get nombreEmpleado() { return this.empleadoForm.get('nombreEmpleado'); }
  get apellidosEmpleado() { return this.empleadoForm.get('apellidosEmpleado'); }
  get rolId() { return this.empleadoForm.get('rolId'); }
}