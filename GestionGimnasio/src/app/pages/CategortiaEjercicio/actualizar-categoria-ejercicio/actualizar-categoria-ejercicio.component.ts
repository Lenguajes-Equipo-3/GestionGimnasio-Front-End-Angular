import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-actualizar-categoria-ejercicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actualizar-categoria-ejercicio.component.html',
  styleUrl: './actualizar-categoria-ejercicio.component.css'
})
export class ActualizarCategoriaEjercicioComponent {
imagenPreview: any;

  categoriaForm: FormGroup;
  imagenSeleccionada: File | undefined;
  URLImagen: string = `${environment.apiURL}` + 'media/';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ActualizarCategoriaEjercicioComponent>,
    private categoriaEjercicioService: CategoriaEjercicioService,
    @Inject(MAT_DIALOG_DATA) public data: Categoria
  ) {
    this.categoriaForm = this.fb.group({
      idCategoria: [data.idCategoria],
      nombreCategoria: [data.nombreCategoria, Validators.required],
      imagen: [data.imagen]
    });

    this.imagenPreview = ""+this.URLImagen+data.imagen;
  }
  actualizarCategoria(): void {
    if (this.categoriaForm.valid) {
      const categoriaActualizada: Categoria = this.categoriaForm.value;
      const imagen = this.imagenSeleccionada ?? null; // Puede ser null si no se seleccionó nueva imagen
  
      console.log('Actualizando categoría con imagen opcional:', categoriaActualizada);
  
      this.categoriaEjercicioService.updateCategoria(categoriaActualizada, imagen)
        .subscribe({
          next: () => this.dialogRef.close('refresh'),
          error: err => {
            console.error('Error al actualizar categoría:', err);
            alert('Error al actualizar la categoría. Intente de nuevo.');
          }
        });
    } else {
      alert('Complete todos los campos requeridos.');
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
