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
  archivosSeleccionados: File[] = [];
  nombreArchivos: string[] = [];
  previews: string[] = [];
  constructor(
    private fb: FormBuilder,
    private categoriaEjercicioService: CategoriaEjercicioService,
    private ejercicioService: EjercicioService
  ) {
    this.ejercicioForm = this.fb.group({
      categoriaEjercicio: [null, Validators.required],
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
    this.archivosSeleccionados.push(null as any);
    this.nombreArchivos.push('');
    this.previews.push('');
  }
  removeImagen(index: number): void {
    this.imagenes.removeAt(index);
    this.archivosSeleccionados.splice(index, 1);
    this.nombreArchivos.splice(index, 1);
    this.previews.splice(index, 1);
  }
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.archivosSeleccionados[index] = file;
      this.nombreArchivos[index] = file.name;
      this.imagenes.at(index).get('urlImagen')?.setValue(file.name);
  
      const reader = new FileReader();
      reader.onload = () => {
        this.previews[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit(): void {
    const hayAlMenosUnaImagen = this.archivosSeleccionados.some((file) => !!file);
  
    if (!hayAlMenosUnaImagen) {
      alert('Debe seleccionar al menos una imagen para actualizar el ejercicio.');
      return;
    }
  
    if (this.ejercicioForm.valid) {
      const formData = new FormData();
  
      // Construir el objeto ejercicio sin las urlImagen
      const ejercicioActualizado = {
        id: this.ejercicio.id, // Asegura que se incluya el ID
        ...this.ejercicioForm.value,
        imagenes: this.ejercicioForm.value.imagenes.map((img: any) => ({
          descripcionImagen: img.descripcionImagen || '',
        })),
      };
  
      formData.append(
        'ejercicio',
        new Blob([JSON.stringify(ejercicioActualizado)], {
          type: 'application/json',
        })
      );
  
      // Agregar imágenes nuevas
      this.archivosSeleccionados.forEach((archivo) => {
        if (archivo) {
          formData.append('imagenes', archivo);
        }
      });
  
      // Consumir servicio
      this.ejercicioService.updateEjercicioConImagenes(this.ejercicio, this.archivosSeleccionados).subscribe({
        next: () => {
          alert('Ejercicio actualizado con éxito');
          this.ejercicioActualizado.emit();
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar el ejercicio');
        },
      });
    }
  }
  
}
  