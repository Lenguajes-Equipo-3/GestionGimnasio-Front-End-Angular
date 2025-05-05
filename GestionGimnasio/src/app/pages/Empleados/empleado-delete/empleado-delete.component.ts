import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Empleado } from '../../../Domain/Empleado.interface';

@Component({
  selector: 'app-empleado-delete-confirm',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './empleado-delete.component.html',
  styleUrls: ['./empleado-delete.component.css']
})
export class EmpleadoDeleteComponent {

  empleado: Empleado;

  constructor(
    public dialogRef: MatDialogRef<EmpleadoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empleado: Empleado }
  ) {
    if (!data || !data.empleado) {
        console.error("Error: Modal de confirmación de borrado abierto sin datos de empleado.");
        this.empleado = {} as Empleado;
    } else {
       this.empleado = data.empleado;
    }
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}