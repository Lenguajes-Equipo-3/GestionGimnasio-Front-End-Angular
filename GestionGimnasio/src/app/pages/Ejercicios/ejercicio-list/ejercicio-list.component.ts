import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EjercicioService } from '../../../services/ejercicio.service';
import { Ejercicio } from '../../../Domain/Ejercicio.interface';
import { EjercicioAddComponent } from '../ejercicio-add/ejercicio-add.component';

@Component({
  selector: 'app-ejercicio-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EjercicioAddComponent],
  templateUrl: './ejercicio-list.component.html',
  styleUrls: ['./ejercicio-list.component.css'],
})
export class EjercicioListComponent implements OnInit {
  ejercicios: Ejercicio[] = [];
  ejerciciosFiltrados: Ejercicio[] = [];
  searchTerm: string = '';
  isLoading = true;
  mostrarFormulario: boolean = false; // Controla si se muestra el formulario o la lista

  constructor(private ejercicioService: EjercicioService) {}

  ngOnInit(): void {
    this.cargarEjercicios();
  }

  cargarEjercicios(): void {
    this.ejercicioService.getAllEjercicios().subscribe({
      next: (data) => {
        this.ejercicios = data;
        this.ejerciciosFiltrados = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los ejercicios:', err);
        this.isLoading = false;
      },
    });
  }

  filtrarEjercicios(): void {
    this.ejerciciosFiltrados = this.ejercicios.filter((ejercicio) =>
      ejercicio.nombreEjercicio.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}