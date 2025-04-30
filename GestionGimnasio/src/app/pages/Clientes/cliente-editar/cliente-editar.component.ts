import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-editar',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.css']
})
export class ClienteEditarComponent implements OnInit {
  cliente: Cliente = {
    idCliente: 0,
    numeroIdentificacion: '',
    nombreCliente: '',
    apellidosCliente: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    nombreContactoEmergencia: '',
    telefonoContactoEmergencia: '',
    fotografia: ''
  };

  esNuevo = true;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.esNuevo = false;
      this.clienteService.obtenerPorId(id).subscribe(cliente => this.cliente = cliente);
    }
  }

  guardar(): void {
    if (this.cliente.idCliente === 0) {
      this.clienteService.insertar(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']); // 👈 Redirige después de insertar
      });
    } else {
      this.clienteService.actualizar(this.cliente).subscribe(() => {
        this.router.navigate(['/clientes']); // 👈 Redirige después de actualizar
      });
    }
  }
  
}
