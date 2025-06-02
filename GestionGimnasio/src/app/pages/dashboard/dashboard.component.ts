import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { RutinaContextService } from '../../services/rutinaC.service';
import { EjercicioService } from  '../../services/ejercicio.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatCardModule,
    MatIconModule,
  
  ]
})
export class DashboardComponent implements OnInit {
  totalClientes = 0;
  totalRutinas = 0;
  totalEjercicios = 0;

  constructor(
    private clienteService: ClienteService,
    private rutinaService: RutinaContextService,
    private ejercicioService: EjercicioService
  ) {}

  ngOnInit(): void {
    this.clienteService.obtenerTodos().subscribe(data => this.totalClientes = data.length);
    this.rutinaService.obtenerTodos().subscribe(data => this.totalRutinas = data.length);
    this.ejercicioService.getAllEjercicios().subscribe(data => this.totalEjercicios = data.length);
  }
}
