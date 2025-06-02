import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Prueba } from '../../../services/prueba.service';

@Component({
  selector: 'app-cliente-lista',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] = [];
  nombreBusqueda: string = '';
  urlImagen: string = `${environment.apiURL}`+'media/';

  constructor(private clienteService: ClienteService, private router: Router ,private prueba : Prueba) {}

  ngOnInit(): void {
    this.cargarClientes();
  }
  generarReporte(idCliente: number) {
    this.prueba.generarReporte(idCliente).subscribe({
    next: () => {
      console.log('Reporte generado exitosamente');
    },

    error: (err) => {
        console.error('Error al generar el reporte:', err);
      }
    });
  }
  cargarClientes(): void {
    this.clienteService.obtenerTodos().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  eliminarCliente(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clienteService.eliminar(id).subscribe(() => {
        this.cargarClientes(); // Recarga la lista después de eliminar
      });
    }
  }

  editarCliente(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }

  buscarPorNombre(nombre: string): void {
    this.clienteService.buscarClientes(nombre).subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al buscar clientes:', err);
      }
    });
  }


  

}
