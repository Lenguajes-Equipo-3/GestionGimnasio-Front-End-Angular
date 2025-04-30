import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedidasService, Medida, Categoria } from '../../../services/medidas-corporales.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';


@Component({
  selector: 'app-editar-medida-dialog',
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
  templateUrl: './editar-medida-dialog.component.html',
  styleUrls: ['./editar-medida-dialog.component.css']

})
export class EditarMedidaDialogComponent implements OnInit {
  EditarMedida: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private medidasService: MedidasService,
    public dialogRef: MatDialogRef<EditarMedidaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { medida: Medida, categorias: Categoria[] }
  ) {
    this.EditarMedida = this.fb.group({
      nombreMedida: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      esObligatoria: [false, Validators.required],
      idCategoria: [null, Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.categorias = this.data.categorias; 
    const medida = this.data.medida;
    console.log('Medida para editar:', medida);
    this.EditarMedida.patchValue(medida);
  }
  

  guardar() {
    if (this.EditarMedida.valid) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas guardar los cambios?');
      if (confirmacion) {
        this.medidasService.updateMedida(this.data.medida.idMedida, this.EditarMedida.value).subscribe(() => {
          this.dialogRef.close('updated');
        });
      }
    }
  }
  
  

  cancelar() {
    this.dialogRef.close();
  }
}


