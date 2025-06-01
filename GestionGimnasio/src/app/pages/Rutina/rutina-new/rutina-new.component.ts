import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RutinaInfoTabComponent } from '../tabs/rutina-info-tab/rutina-info-tab.component';
import { RutinaContextService } from '../../../services/rutinaC.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class RutinaNewComponent implements OnInit, OnDestroy{
cliente: Cliente | null = null;
private subscription!: Subscription;

   constructor(private rutinaContext: RutinaContextService ) {}

   ngOnInit(): void {
    this.rutinaContext.setEmpleado();
    this.subscription = this.rutinaContext.rutina$.subscribe(rutina => {
      this.cliente = rutina.cliente ?? null;
    });
  }
   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
