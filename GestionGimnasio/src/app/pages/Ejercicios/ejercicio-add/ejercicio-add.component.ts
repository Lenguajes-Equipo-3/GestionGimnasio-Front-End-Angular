import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EjercicioService } from '../../../services/ejercicio.service';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';

@Component({
  selector: 'app-ejercicio-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importar ReactiveFormsModule aquí
  templateUrl: './ejercicio-add.component.html',
  styleUrls: ['./ejercicio-add.component.css'],
})
export class EjercicioAddComponent implements OnInit {
  ejercicioForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private ejercicioService: EjercicioService,
    private categoriaEjercicioService: CategoriaEjercicioService
  ) {
    this.ejercicioForm = this.fb.group({
      idCategoriaEjercicio: [null, Validators.required],
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
    this.imagenes.removeAt(index);
  }

  onSubmit(): void {
    if (this.ejercicioForm.valid) {
      this.ejercicioService.createEjercicio(this.ejercicioForm.value).subscribe({
        next: () => {
          alert('Ejercicio registrado con éxito'); // Mensaje de éxito
          this.ejercicioForm.reset();
          this.imagenes.clear();
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar el ejercicio'); // Mensaje de error
        },
      });
    }
  }
}