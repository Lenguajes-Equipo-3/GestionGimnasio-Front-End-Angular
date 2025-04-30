import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EjercicioService } from '../../../services/ejercicio.service';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { Ejercicio } from '../../../Domain/Ejercicio.interface';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';
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
  categorias: Categoria[] = []; // Lista de categorías cargadas
  searchTerm: string = '';
  isLoading = true;
  mostrarFormulario: boolean = false; // Controla si se muestra el formulario o la lista

  constructor(
    private ejercicioService: EjercicioService,
    private categoriaEjercicioService: CategoriaEjercicioService
  ) {}

  ngOnInit(): void {
    this.cargarEjercicios();
    this.cargarCategorias(); // Cargar las categorías al iniciar
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

  cargarCategorias(): void {
    this.categoriaEjercicioService.getAllCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
      },
    });
  }

  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias.find((cat) => cat.idCategoria === idCategoria);
    return categoria ? categoria.nombreCategoria : 'Sin categoría';
  }

  filtrarEjercicios(): void {
    this.ejerciciosFiltrados = this.ejercicios.filter((ejercicio) =>
      ejercicio.nombreEjercicio.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}