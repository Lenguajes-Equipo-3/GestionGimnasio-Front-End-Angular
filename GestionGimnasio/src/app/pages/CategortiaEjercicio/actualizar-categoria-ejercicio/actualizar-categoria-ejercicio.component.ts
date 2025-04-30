import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';

@Component({
  selector: 'app-actualizar-categoria-ejercicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actualizar-categoria-ejercicio.component.html',
  styleUrl: './actualizar-categoria-ejercicio.component.css'
})
export class ActualizarCategoriaEjercicioComponent {
  categoriaForm: FormGroup;

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
  }
  actualizarCategoria(): void {
    if (this.categoriaForm.invalid) return;

    const categoriaActualizada: Categoria = this.categoriaForm.value;
    console.log('Enviando datos al backend:', categoriaActualizada);
    this.categoriaEjercicioService.updateCategoria(categoriaActualizada).subscribe({
      next: () => this.dialogRef.close('refresh'),
      error: err => {
        console.error('Error al actualizar categoría:', err);
        alert('Error al actualizar la categoría. Intente de nuevo.');
      }
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
