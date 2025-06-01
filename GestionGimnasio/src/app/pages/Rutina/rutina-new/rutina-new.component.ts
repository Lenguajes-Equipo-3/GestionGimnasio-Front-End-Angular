import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RutinaInfoTabComponent } from '../tabs/rutina-info-tab/rutina-info-tab.component';
import { RutinaContextService } from '../../../services/rutina.service';
import { Router } from '@angular/router';
import { Cliente } from '../../../services/cliente.service';
import { RutinaMedidasCorporalesTabComponent } from "../tabs/rutina-medidas-corporales-tab/rutina-medidas-corporales-tab.component";
import { RutinaEjerciciosTabComponent } from "../tabs/rutina-ejercicios-tab/rutina-ejercicios-tab.component";
import { RutinaResumenTabComponent } from "../tabs/rutina-resumen-tab/rutina-resumen-tab.component";

@Component({
  selector: 'app-rutina-new',
  imports: [CommonModule, MatTabsModule, RutinaInfoTabComponent, RutinaMedidasCorporalesTabComponent, RutinaEjerciciosTabComponent, RutinaResumenTabComponent],
  templateUrl: './rutina-new.component.html',
  styleUrl: './rutina-new.component.css'
})
export class RutinaNewComponent {
cliente: Cliente | null = null;
   constructor(private rutinaContext: RutinaContextService ) {}

    ngOnInit(): void {
    this.cliente = this.rutinaContext.getClienteSeleccionadoValor();

    if (!this.cliente) {
      // Podés redirigir o mostrar error si llegó sin cliente seleccionado
    }}
}
