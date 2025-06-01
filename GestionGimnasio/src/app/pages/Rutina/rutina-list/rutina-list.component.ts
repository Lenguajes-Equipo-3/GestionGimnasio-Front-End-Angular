import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RutinaContextService } from '../../../services/rutina.service';
import { Cliente } from '../../../services/cliente.service';
@Component({
  selector: 'app-rutina-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './rutina-list.component.html',
  styleUrl: './rutina-list.component.css'
})
export class RutinaListComponent implements OnInit {
clientes: Cliente[] = [];
  nombreBusqueda: string = '';
   constructor(private rutinaContext: RutinaContextService,
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
    this.rutinaContext.obtenerTodos().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
 buscarPorNombre(nombre: string): void {
        this.rutinaContext.buscarClientes(nombre).subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al buscar clientes:', err);
      }
    });
  }
}//end
