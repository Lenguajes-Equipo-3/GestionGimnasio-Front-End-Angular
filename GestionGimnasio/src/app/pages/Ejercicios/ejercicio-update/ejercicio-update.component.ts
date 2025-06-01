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
import { environment } from '../../../../environments/environment';

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
  urlImagenes: string = environment.apiURL + 'media/'; // URL base para las imágenes

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

    // Inicializar previews con cadenas vacías
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
      this.ejercicioForm.patchValue({
        categoriaEjercicio: this.ejercicio.categoriaEjercicio,
        nombreEjercicio: this.ejercicio.nombreEjercicio,
        descripcionEjercicio: this.ejercicio.descripcionEjercicio,
        codigoEquipo: this.ejercicio.codigoEquipo,
      });
  
      this.imagenes.clear();
  
      this.ejercicio.imagenes.forEach((imagen) => {
        this.imagenes.push(
          this.fb.group({
            urlImagen: [imagen.urlImagen],
            descripcionImagen: [imagen.descripcionImagen || '', Validators.maxLength(255)],
          })
        );
      });
  
      this.previews = this.ejercicio.imagenes.map(
        (imagen) => this.urlImagenes + imagen.urlImagen
      );
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
  
    if (!hayAlMenosUnaImagen && this.imagenes.length === 0) {
      alert('Debe seleccionar al menos una imagen para actualizar el ejercicio.');
      return; 
    }
  
    if (this.ejercicioForm.valid) {
      const formData = new FormData();
  
      const formValue = this.ejercicioForm.value;

      const ejercicioActualizado: Ejercicio = {
        id: this.ejercicio.id,
        categoriaEjercicio: formValue.categoriaEjercicio,
        nombreEjercicio: formValue.nombreEjercicio,
        descripcionEjercicio: formValue.descripcionEjercicio,
        codigoEquipo: formValue.codigoEquipo,
        imagenes: formValue.imagenes.map((img: any) => ({
          urlImagen: img.urlImagen, // el backend la completa
          descripcionImagen: img.descripcionImagen || ''
        }))
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
      console.log('Ejercicio actualizado (formulario):', this.ejercicioForm.value);
      console.log('Ejercicio armado para enviar:', ejercicioActualizado);
      // Consumir servicio
      this.ejercicioService.updateEjercicioConImagenes(ejercicioActualizado, this.archivosSeleccionados).subscribe({
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
  