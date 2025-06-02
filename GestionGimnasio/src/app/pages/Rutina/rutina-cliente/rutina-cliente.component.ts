import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaContextService } from '../../../services/rutinaC.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rutinas-cliente',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './rutina-cliente.component.html',
  styleUrls: ['./rutina-cliente.component.css'],
})
export class RutinaClienteComponent implements OnInit {
  idCliente!: number;
  rutinas: any[] = []; // Cambia a array
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private rutinaService: RutinaContextService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCliente = Number(this.route.snapshot.paramMap.get('idCliente'));
    this.cargarRutinas();
  }

  cargarRutinas() {
    this.loading = true;
    this.rutinaService.obtenerRutinasPorCliente(this.idCliente).subscribe({
      next: (rutinas) => {
        this.rutinas = rutinas;
        this.loading = false;
      },
      error: () => {
        this.rutinas = [];
        this.loading = false;
      },
    });
  }

  eliminarRutina(idRutina: number) {
    if (confirm('¿Seguro que desea eliminar esta rutina?')) {
      this.rutinaService.eliminarRutina(idRutina).subscribe({
        next: () => {
          alert('Rutina eliminada');
          this.cargarRutinas();
        },
        error: () => alert('Error al eliminar la rutina'),
      });
    }
  }
  editarRutina(idRutina: number) {
    this.router.navigate(['/rutina/editar', idRutina]);
  }

  volver() {
    this.router.navigate(['/rutina']);
  }

  getNombresEjercicios(rutina: any): string {
    if (!rutina.ejercicios || rutina.ejercicios.length === 0) return '';
    return rutina.ejercicios
      .map((e: any) => e.ejercicio?.nombreEjercicio)
      .filter((n: string | undefined) => !!n)
      .join(', ');
  }
}
