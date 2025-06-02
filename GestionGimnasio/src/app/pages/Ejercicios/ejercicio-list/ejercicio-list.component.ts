import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EjercicioService } from '../../../services/ejercicio.service';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { Ejercicio } from '../../../Domain/Ejercicio.interface';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';
import { EjercicioAddComponent } from '../ejercicio-add/ejercicio-add.component';
import { EjercicioUpdateComponent } from '../ejercicio-update/ejercicio-update.component';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-ejercicio-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EjercicioAddComponent,
    EjercicioUpdateComponent,
  ],
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
urlImagenes: string = environment.apiURL + 'media/'; // URL base para las imágenes
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

  obtenerNombreCategoria(categoriaEjercicio: Categoria): string {
    return categoriaEjercicio ? categoriaEjercicio.nombreCategoria : 'Sin categoría';
  }

  filtrarEjercicios(): void {
    this.ejerciciosFiltrados = this.ejercicios.filter((ejercicio) =>
      ejercicio.nombreEjercicio
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  ejercicioSeleccionado: Ejercicio | null = null;

  editarEjercicio(ejercicio: Ejercicio): void {
    if (!ejercicio.id) {
      console.error('El ejercicio seleccionado no tiene un ID válido.');
      alert('Error: El ejercicio seleccionado no tiene un ID válido.');
      return;
    }
    this.ejercicioSeleccionado = ejercicio; // Actualiza el ejercicio seleccionado
  }

  cancelarEdicion(): void {
    this.ejercicioSeleccionado = null;
  }

  onEjercicioActualizado(): void {
    this.cargarEjercicios(); // Refrescar la lista de ejercicios
    this.ejercicioSeleccionado = null; // Cerrar el formulario de actualización
  }

  eliminarEjercicio(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este ejercicio?')) {
      this.ejercicioService.deleteEjercicio(id).subscribe({
        next: () => {
          alert('Ejercicio eliminado con éxito');
          this.cargarEjercicios(); // Refrescar la lista de ejercicios
        },
        error: (err) => {
          console.error('Error al eliminar el ejercicio:', err);
          alert('Error al eliminar el ejercicio');
        },
      });
    }
  }

  buscarEjercicio(): void {
    if (this.searchTerm.trim() === '') {
      this.cargarEjercicios(); // Si el campo de búsqueda está vacío, recargar todos los ejercicios
      return;
    }
  
    this.ejercicioService.getEjercicioByNombre(this.searchTerm).subscribe({
      next: (ejercicio) => {
        this.ejerciciosFiltrados = [ejercicio]; // Mostrar solo el ejercicio encontrado
      },
      error: (err) => {
        console.error('Error al buscar el ejercicio:', err);
        alert('No se encontró ningún ejercicio con ese nombre.');
        this.ejerciciosFiltrados = []; // Limpiar la lista si no se encuentra el ejercicio
      },
    });
  }

}
