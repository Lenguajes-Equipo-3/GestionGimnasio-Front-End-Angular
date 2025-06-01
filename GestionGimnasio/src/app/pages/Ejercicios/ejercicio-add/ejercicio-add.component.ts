import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjercicioService } from '../../../services/ejercicio.service';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ejercicio-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ejercicio-add.component.html',
  styleUrls: ['./ejercicio-add.component.css'],
})
export class EjercicioAddComponent implements OnInit {

  @Output() ejercicioRegistrado = new EventEmitter<void>();

  ejercicioForm: FormGroup;
  categorias: Categoria[] = [];
imagenPreview: any;
nombreArchivos: string[] = [];
archivosSeleccionados: File[] = []; // Para enviar al backend
previews: string[] = [];
  constructor(
    private fb: FormBuilder,
    private ejercicioService: EjercicioService,
    private categoriaEjercicioService: CategoriaEjercicioService,
    private cdr: ChangeDetectorRef
  ) {
    this.ejercicioForm = this.fb.group({
      categoriaEjercicio: [null, Validators.required], // Cambiado a un objeto
      nombreEjercicio: ['', [Validators.required, Validators.maxLength(50)]],
      descripcionEjercicio: ['', [Validators.required, Validators.maxLength(100)]],
      codigoEquipo: ['', [Validators.maxLength(20)]],
      imagenes: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
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

  get imagenes(): FormArray {
    return this.ejercicioForm.get('imagenes') as FormArray;
  }

  addImagen(): void {
    this.imagenes.push(
      this.fb.group({
        urlImagen: ['', [Validators.required]],
        descripcionImagen: ['', [Validators.maxLength(255)]],
      })
    );
  }

  removeImagen(index: number): void {
    this.imagenes.removeAt(index);                  // Elimina del FormArray
  
    this.archivosSeleccionados.splice(index, 1);    // Elimina el archivo seleccionado
    this.nombreArchivos.splice(index, 1);           // Elimina el nombre del archivo
    this.previews.splice(index, 1);                 // Elimina la vista previa
  }
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.archivosSeleccionados[index] = file;
      this.nombreArchivos[index] = file.name;
  
      // Guardar temporalmente el nombre en el FormGroup
      this.imagenes.at(index).get('urlImagen')?.setValue(file.name);
  
      // Crear la vista previa con FileReader
      const reader = new FileReader();
      reader.onload = () => {
        this.previews[index] = reader.result as string;
        this.cdr.detectChanges(); // <- fuerza actualización inmediata

      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit(): void {
    const hayImagenes = this.archivosSeleccionados.some((f) => !!f);
  
    if (!hayImagenes) {
      alert('Debe seleccionar al menos una imagen.');
      return;
    }
  
    if (this.ejercicioForm.valid) {
      const formData = new FormData();
  
      const nuevoEjercicio = {
        ...this.ejercicioForm.value,
        imagenes: this.ejercicioForm.value.imagenes.map((img: any) => ({
          descripcionImagen: img.descripcionImagen || '',
        })),
      };
  
      formData.append(
        'ejercicio',
        new Blob([JSON.stringify(nuevoEjercicio)], { type: 'application/json' })
      );
  
      this.archivosSeleccionados.forEach((archivo) => {
        if (archivo) {
          formData.append('imagenes', archivo);
        }
      });
  
      this.ejercicioService.createEjercicioFormData(formData).subscribe({
        next: () => {
          alert('Ejercicio creado con éxito');
          this.ejercicioActualizado.emit(); // o cerrar modal, etc.
        },
        error: (err) => {
          console.error('Error al crear el ejercicio:', err);
          alert('Error al crear el ejercicio');
        },
      });
    }
  }
  
  onSubmit(): void {
    if (this.ejercicioForm.valid) {
      this.ejercicioService.createEjercicio(this.ejercicioForm.value).subscribe({
        next: () => {
          alert('Ejercicio registrado con éxito');
          this.ejercicioForm.reset();
          this.imagenes.clear();
          this.ejercicioRegistrado.emit(); 
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar el ejercicio');
        },
      });
    }
  }
}