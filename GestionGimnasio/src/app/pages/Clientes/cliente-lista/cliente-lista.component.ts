import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-lista',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.cargarClientes();
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

}
