import { CommonModule } from '@angular/common';
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RutinaContextService } from '../../../../services/rutinaC.service';
import { Cliente } from '../../../../services/cliente.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Empleado } from '../../../../Domain/Empleado.interface';


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
  empleado: Empleado | null = null;
  private subscription!: Subscription;
  objetivo = '';
 lesiones = '';
 enfermedades = '';
 fechaRenovacion!: Date;
 esVigente = true;
 fechaCreacion: Date = new Date(); // Automáticamente asignada al cargar el componente
formDesactivado = false;

  @Output() datosGuardados = new EventEmitter<void>();
   constructor(private rutinaContext: RutinaContextService,
       private dialog: MatDialog
    ) {}

     ngOnInit(): void {
    // Fecha de renovación = fecha de creación + 3 meses
  this.fechaRenovacion = new Date(this.fechaCreacion);
  this.fechaRenovacion.setMonth(this.fechaRenovacion.getMonth() + 3);

  // Suscripción para obtener el cliente
  this.subscription = this.rutinaContext.rutina$.subscribe(rutina => {
    this.cliente = rutina.cliente ?? null;
    this.empleado = rutina.empleado ?? null;
    console.log('Empleado recibido:', this.empleado);
  });
  }
      ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  

 guardar() {
  if (!this.objetivo || !this.fechaRenovacion) {
    alert('Por favor, complete todos los campos requeridos.');
    return;
  }

  this.rutinaContext.setDatosGenerales(
    this.objetivo,
    this.lesiones,
    this.enfermedades,
    this.fechaRenovacion,
    this.esVigente
  );
  

  alert('Pase al siguiente paso.');
}
}

