import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Ejercicio } from '../../../Domain/Ejercicio.interface';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { EjercicioService } from '../../../services/ejercicio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ejercicio-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ejercicio-update.component.html',
  styleUrls: ['./ejercicio-update.component.css'],
})
export class EjercicioUpdateComponent implements OnInit, OnChanges {
  @Input() ejercicio!: Ejercicio; // Recibe el ejercicio a actualizar
  @Output() ejercicioActualizado = new EventEmitter<void>(); // Evento para notificar al padre
  ejercicioForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriaEjercicioService: CategoriaEjercicioService,
    private ejercicioService: EjercicioService
  ) {
    this.ejercicioForm = this.fb.group({
      idCategoriaEjercicio: [null, Validators.required],
      nombreEjercicio: ['', [Validators.required, Validators.maxLength(50)]],
      descripcionEjercicio: [
        '',
        [Validators.required, Validators.maxLength(100)],
      ],
      codigoEquipo: ['', [Validators.maxLength(20)]],
      imagenes: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarEjercicio();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ejercicio'] && changes['ejercicio'].currentValue) {
      this.cargarEjercicio();
    }
  }

  cargarCategorias(): void {
    this.categoriaEjercicioService.getAllCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        console.error('Error al cargar las categorías', err);
      },
    });
  }

  cargarEjercicio(): void {
    if (this.ejercicio) {
      this.ejercicioForm.patchValue(this.ejercicio); // Carga todos los valores, incluido el ID
      this.imagenes.clear(); // Limpiar imágenes antes de cargarlas
      this.ejercicio.imagenes.forEach((imagen) => {
        this.imagenes.push(
          this.fb.group({
            urlImagen: [imagen.urlImagen, Validators.required],
            descripcionImagen: [
              imagen.descripcionImagen,
              Validators.maxLength(255),
            ],
          })
        );
      });
    }
  }

  get imagenes(): FormArray {
    return this.ejercicioForm.get('imagenes') as FormArray;
  }

  addImagen(): void {
    this.imagenes.push(
      this.fb.group({
        urlImagen: ['', Validators.required],
        descripcionImagen: ['', Validators.maxLength(255)],
      })
    );
  }

  removeImagen(index: number): void {
    this.imagenes.removeAt(index);
  }

  onSubmit(): void {
    if (this.ejercicioForm.valid) {
      const updatedEjercicio = {
        ...this.ejercicio,
        ...this.ejercicioForm.value,
      };

      if (!updatedEjercicio.id) {
        console.error('El ejercicio no tiene un ID válido.');
        alert('Error: El ejercicio no tiene un ID válido.');
        return;
      }

      this.ejercicioService.updateEjercicio(updatedEjercicio).subscribe({
        next: () => {
          alert('Ejercicio actualizado con éxito');
          this.ejercicioActualizado.emit(); // Notificar al componente padre
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar el ejercicio');
        },
      });
    }
  }
}
