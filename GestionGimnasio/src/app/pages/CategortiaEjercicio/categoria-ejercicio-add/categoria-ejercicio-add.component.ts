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
    if (this.categoriaForm.valid) {
      const nuevaCategoria: Categoria = this.categoriaForm.value;
      console.log('Nueva categoría a enviar:', nuevaCategoria);
  
      this.categoriaEjercicioService.createCategoria(nuevaCategoria).subscribe();
  
      this.dialogRef.close('refresh'); // Para recargar la lista después
    }
  }
  

  cerrar() {
    this.dialogRef.close();
  }
}
