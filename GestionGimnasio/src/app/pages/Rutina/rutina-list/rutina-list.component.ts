import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RutinaContextService } from '../../../services/rutinaC.service';
import { Cliente } from '../../../services/cliente.service';

@Component({
  standalone: true,
  selector: 'app-rutina-list',
  imports: [CommonModule, MatDialogModule, FormsModule, RouterModule],
  templateUrl: './rutina-list.component.html',
  styleUrls: ['./rutina-list.component.css'],
})
export class RutinaListComponent implements OnInit {
  clientes: Cliente[] = [];
  nombreBusqueda: string = '';

  constructor(
    private rutinaContext: RutinaContextService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  asignarClienteYCrearRutina(cliente: Cliente) {
    this.rutinaContext.setClienteSeleccionado(cliente);
    this.router.navigate(['/rutina/nueva']);
  }

  cargarClientes(): void {
    this.rutinaContext.obtenerTodos().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
      },
    });
  }

  buscarPorNombre(nombre: string): void {
    if (!nombre.trim()) {
      this.cargarClientes();
      return;
    }
    this.rutinaContext.buscarClientes(nombre).subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al buscar clientes:', err);
      },
    });
  }

  verRutinasCliente(cliente: Cliente) {
    this.router.navigate(['/rutina/cliente', cliente.idCliente]);
  }



  generarReporte(idCliente: number) {
    this.rutinaContext.generarReporte(idCliente).subscribe({
    next: () => {
      console.log('Reporte generado exitosamente');
    },

    error: (err) => {
        console.error('Error al generar el reporte:', err);
      }
    });
  }
}
