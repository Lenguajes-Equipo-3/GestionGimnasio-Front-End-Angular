import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedidasService, Categoria } from '../../../services/medidas-corporales.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-agregar-medida-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './agregar-medida.component.html',
  styleUrls: ['./agregar-medida.component.css']
})
export class AgregarMedidaDialogComponent implements OnInit {
  agregarMedida: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private medidasService: MedidasService,
    public dialogRef: MatDialogRef<AgregarMedidaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categorias: Categoria[], idCategoriaSeleccionada?: number }
  ) {
    this.agregarMedida = this.fb.group({
      nombreMedida: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      esObligatoria: [false, Validators.required],
      idCategoria: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.categorias = this.data.categorias;
    this.agregarMedida.patchValue({
      idCategoria: this.data.idCategoriaSeleccionada || null
    });
  }

  guardar() {
    if (this.agregarMedida.valid) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas agregar esta medida?');
      if (confirmacion) {
        this.medidasService.agregarMedida(this.agregarMedida.value).subscribe(() => {
          this.dialogRef.close('added');
        });
      }
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
