import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from '../../../../services/cliente.service';
import { Empleado } from '../../../../Domain/Empleado.interface';
import { Subscription } from 'rxjs';
import { ItemRutinaEjercicio } from '../../../../Domain/ItemRutinaEjercicio';
import { ItemRutinaMedida } from '../../../../Domain/RutinaCompleta.interface';
import { RutinaContextService } from '../../../../services/rutinaC.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-rutina-resumen-tab',
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './rutina-resumen-tab.component.html',
  styleUrl: './rutina-resumen-tab.component.css'
})
export class RutinaResumenTabComponent implements OnInit {
cliente: Cliente | null = null;
  empleado: Empleado | null = null;
   itemRutiEjercicio: ItemRutinaEjercicio[]=[];
    itemRutinaMedida :ItemRutinaMedida[]=[];
 private subscription!: Subscription;
   objetivo = '';
 lesiones = '';
 enfermedades = '';
 fechaRenovacion!: Date;
 esVigente = true;
 medidadS=String;
 ejercicios=String;
 fechaCreacion: Date = new Date();
 @Output() datosGuardados = new EventEmitter<void>();
  rutina:any;

  constructor(private rutinaContextService: RutinaContextService) {}

  ngOnInit(): void {
this.rutina = this.rutinaContextService.getRutinaActual(); 
this.itemRutiEjercicio=this.rutina.getEjercicios();
this.cliente=this.rutina.getCliente();
this.itemRutinaMedida=this.rutina.getMedidas();
this.empleado=this.rutina.getEmpleado;
this.objetivo=this.rutina.getObjetivo();
this.lesiones=this.rutina.getLesiones();
this.enfermedades=this.rutina.getEnfermedades();
this.fechaRenovacion=this.rutina.getFechaRenovacion();
this.esVigente=this.rutina.getEsVigente();
this.medidadS=this.rutina.medidas.toString;
  }

   guardarCambios(): void {}
   guardarRutina(){}
}

