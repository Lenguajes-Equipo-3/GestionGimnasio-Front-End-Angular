import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../../services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-lista',
  imports: [CommonModule],
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.obtenerTodos().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  eliminarCliente(id: number): void {
    this.clienteService.eliminar(id).subscribe(() => {
      this.cargarClientes(); // Recargar la lista después de eliminar
    });
  }
    
}
