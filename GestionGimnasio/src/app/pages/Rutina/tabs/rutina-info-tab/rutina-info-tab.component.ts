import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RutinaContextService } from '../../../../services/rutina.service';
import { Cliente } from '../../../../services/cliente.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rutina-info-tab',
  imports: [CommonModule, MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonModule, MatCardModule, ReactiveFormsModule, MatAutocompleteModule,FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './rutina-info-tab.component.html',
  styleUrl: './rutina-info-tab.component.css'
})
export class RutinaInfoTabComponent  implements OnInit{
  
  cliente: Cliente | null = null;
  objetivo = '';
 lesiones = '';
 enfermedades = '';
 fechaRenovacion!: Date;
 esVigente = true;
 fechaCreacion: Date = new Date(); // Automáticamente asignada al cargar el componente

   constructor(private rutinaContext: RutinaContextService ) {}

   ngOnInit(): void {
    this.cliente = this.rutinaContext.getClienteSeleccionadoValor();

    if (!this.cliente) {
      // Podés redirigir o mostrar error si llegó sin cliente seleccionado
    }}
    

  guardar() {
  this.rutinaContext.actualizarRutina({
    objetivo: this.objetivo,
    lesiones: this.lesiones,
    enfermedades: this.enfermedades,
    fechaRenovacion: this.fechaRenovacion,
    esVigente: this.esVigente
  });
    
  }
}

