import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';

@Component({
  selector: 'app-categoria-ejercicio-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-ejercicio-add.component.html',
  styleUrls: ['./categoria-ejercicio-add.component.css']
})
export class CategoriaEjercicioAddComponent {
  categoriaForm: FormGroup;
  imagenSeleccionada: File | null = null;
  imagenPreview: string | null = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoriaEjercicioAddComponent>,
    private categoriaEjercicioService: CategoriaEjercicioService,

  ) {
    this.categoriaForm = this.fb.group({
      idCategoria: [0], // Aquí inicializamos en 0
      nombreCategoria: ['', Validators.required],
      imagen: ['']
    });
    
  }

  guardarCategoria() {
    if (this.categoriaForm.valid && this.imagenSeleccionada) {
      const nuevaCategoria: Categoria = this.categoriaForm.value;
  
      console.log('Enviando categoría con imagen:', nuevaCategoria);
  
      this.categoriaEjercicioService.createCategoria(nuevaCategoria, this.imagenSeleccionada)
        .subscribe({
          next: () => this.dialogRef.close('refresh'),
          error: err => {
            console.error('Error al guardar categoría:', err);
            alert('Hubo un error al guardar la categoría.');
          }
        });
    } else {
      alert('Complete todos los campos y seleccione una imagen.');
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
  
      // Vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
