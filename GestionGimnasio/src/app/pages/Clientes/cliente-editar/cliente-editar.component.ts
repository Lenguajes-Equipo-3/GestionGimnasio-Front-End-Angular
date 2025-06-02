import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cliente-editar',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.css']
})
export class ClienteEditarComponent implements OnInit {
  urlImagen: string = `${environment.apiURL}`+'media/';

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
    ,gmail: ''
  };

  esNuevo = true;
imagenPreview: any;

imagenSeleccionada: File | any = null;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {

   
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.esNuevo = false;
      this.clienteService.obtenerPorId(id).subscribe({
        next: (cliente) => {
          this.cliente = cliente;
          this.imagenPreview= this.urlImagen + this.cliente.fotografia; 
          console.log();// Asignar la URL de la imagen al cliente
        },
        error: (error) => {
          console.error('Error al obtener el cliente:', error);
          this.router.navigate(['/clientes']); // Redirigir si hay un error
        }
      });
    
    }
   
  

  }

  guardar(): void {
   
      if (this.cliente.idCliente === 0) {
        if(this.imagenSeleccionada){
        this.clienteService.insertar(this.cliente,this.imagenSeleccionada).subscribe(() => {
          this.router.navigate(['/clientes']);
        });
      }
      } else {
        
        this.clienteService.actualizar(this.cliente,this.imagenSeleccionada).subscribe(() => {
          this.router.navigate(['/clientes']);
        });
      }
    
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
  
      // Vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }
}
