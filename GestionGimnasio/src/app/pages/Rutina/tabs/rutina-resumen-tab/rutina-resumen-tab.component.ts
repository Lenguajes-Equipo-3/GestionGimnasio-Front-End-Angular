import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../services/cliente.service';
import { Empleado } from '../../../../Domain/Empleado.interface';
import { Subscription } from 'rxjs';
import { RutinaContextService } from '../../../../services/rutinaC.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rutina-resumen-tab',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './rutina-resumen-tab.component.html',
  styleUrl: './rutina-resumen-tab.component.css'
})
export class RutinaResumenTabComponent implements OnInit {
  cliente: Cliente | null = null;
  empleado: Empleado | null = null;
  rutina: any = null;

  constructor(private rutinaContextService: RutinaContextService) {}

  ngOnInit(): void {
  this.rutinaContextService.rutina$.subscribe((rutina) => {
    this.rutina = rutina;
    this.cliente = rutina.cliente ?? null;
    this.empleado = rutina.empleado ?? null;
  });
}

  getNombresEjercicios(): string {
    if (!this.rutina?.ejercicios?.length) return 'Sin ejercicios';
    return this.rutina.ejercicios
      .map((e: any) => e.ejercicio?.nombreEjercicio)
      .filter((n: string | undefined) => !!n)
      .join(', ');
  }
}