import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service';
import { Empleado } from '../../../Domain/Empleado.interface';
import { finalize } from 'rxjs/operators';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpleadoAddComponent } from '../empleado-add/empleado-add.component';
import { EmpleadoUpdateComponent } from '../empleado-update/empleado-update.component';
import { EmpleadoDeleteComponent } from '../empleado-delete/empleado-delete.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empleado-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  operationMessage: string | null = null;
  terminoBusqueda: string = '';

  constructor(private empleadoService: EmpleadoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.empleadoService.getEmpleados()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: Empleado[]) => {
          this.empleados = data.map(emp => ({
            ...emp,
            idRol: emp.rolId !== undefined && emp.rolId !== null ? Number(emp.rolId) : undefined,
            nombreRol: emp.nombreRol || 'Rol no especificado'
          }));
          this.filtrarEmpleados();
        },
        error: (err) => {
          this.handleLoadError(err);
        }
      });
  }

  filtrarEmpleados(): void {
    const filtro = this.terminoBusqueda.toLowerCase().trim();
    if (!filtro) {
      this.empleadosFiltrados = [...this.empleados];
    } else {
      this.empleadosFiltrados = this.empleados.filter(emp =>
        emp.nombreEmpleado.toLowerCase().includes(filtro) ||
        emp.apellidosEmpleado.toLowerCase().includes(filtro) ||
        emp.nombreUsuario.toLowerCase().includes(filtro) ||
        (emp.nombreRol && emp.nombreRol.toLowerCase().includes(filtro)) ||
        (Number.isInteger(Number(filtro)) && emp.idEmpleado === Number(filtro))
      );
    }
  }

  openAddEmpleadoModal(): void {
    const dialogRef = this.dialog.open(EmpleadoAddComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.showOperationMessage('Empleado agregado exitosamente.');
        this.loadInitialData();
      }
    });
  }

  openEditEmpleadoModal(empleado: Empleado): void {
    if (!empleado || empleado.idEmpleado === undefined) {
      console.error('Intento de editar empleado sin ID válido:', empleado);
      this.showErrorMessage('No se puede editar el empleado seleccionado (ID inválido).');
      return;
    }
    console.log("Abriendo modal para editar:", empleado);

    const dialogRef = this.dialog.open(EmpleadoUpdateComponent, {
      width: '600px',
      disableClose: true,
      data: { empleado: empleado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.showOperationMessage(`Empleado "${empleado.nombreEmpleado}" actualizado exitosamente.`);
        this.loadInitialData();
      }
    });
  }

  deleteEmpleado(empleado: Empleado): void {
    if (!empleado || empleado.idEmpleado === undefined) {
      this.showErrorMessage('No se puede eliminar el empleado: ID inválido.');
      return;
    }

    const dialogRef = this.dialog.open(EmpleadoDeleteComponent, {
      width: '480px',
      disableClose: true,
      data: { empleado: empleado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.isLoading = true;
        this.errorMessage = null;
        this.operationMessage = null;

        this.empleadoService.deleteEmpleado(empleado.idEmpleado!)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe({
            next: () => {
              const nombreCompleto = `${empleado.nombreEmpleado} ${empleado.apellidosEmpleado}`;
              this.showOperationMessage(`Empleado "${nombreCompleto}" (ID: ${empleado.idEmpleado}) eliminado correctamente.`);
              this.loadInitialData(); 
            },
            error: (err) => {
              this.showErrorMessage(`Error al eliminar empleado (ID: ${empleado.idEmpleado}): ${err.message || 'Error desconocido'}`);
            }
          });
      } else {
        console.log('Eliminación cancelada por el usuario.');
      }
    });
  }

  private showOperationMessage(message: string): void {
    this.operationMessage = message;
    setTimeout(() => this.operationMessage = null, 3500);
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 5000);
  }

  private handleLoadError(err: any): void {
    console.error("Error al cargar empleados:", err);
    this.errorMessage = `Error al cargar empleados: ${err.message || 'Error desconocido'}`;
    this.empleados = [];
    this.empleadosFiltrados = [];
  }
}