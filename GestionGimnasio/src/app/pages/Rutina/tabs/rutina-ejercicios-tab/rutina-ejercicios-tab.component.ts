import { Component, OnInit } from '@angular/core';
import { Ejercicio } from '../../../../Domain/Ejercicio.interface';
import { ItemRutinaEjercicio } from '../../../../Domain/ItemRutinaEjercicio';
import { EjercicioService } from '../../../../services/ejercicio.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-rutina-ejercicios-tab',
  imports: [  
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule
  ],  
  standalone: true,
  templateUrl: './rutina-ejercicios-tab.component.html',
  styleUrl: './rutina-ejercicios-tab.component.css'
})
export class RutinaEjerciciosTabComponent implements OnInit {

  ejercicios: Ejercicio[] = [];
  ejerciciosPorCategoria: { [categoria: string]: Ejercicio[] } = {};
  ejercicioSeleccionado: Ejercicio | null = null;
   formVisible: boolean = false;

  // Datos del formulario
  series: number = 0;
  repeticiones: number = 0;
  codigoEquipo: string = '';
  itemRutinaEjercicio: ItemRutinaEjercicio[] = [];// ejercicios del cliente

constructor(private ejerciciosService: EjercicioService) {}
  
ngOnInit(): void {
 this.ejerciciosService.getAllEjercicios().subscribe(ejercicios => {
      this.ejercicios = ejercicios;
      this.ejerciciosPorCategoria = ejercicios.reduce((acc, ejercicio) => {
        const cat = ejercicio.categoriaEjercicio.nombreCategoria;
        acc[cat] = acc[cat] || [];
        acc[cat].push(ejercicio);
        return acc;
      }, {} as { [categoria: string]: Ejercicio[] });
    });
  
 }//ngOnInit

 abrirFormulario(ejercicio: Ejercicio) {
    this.ejercicioSeleccionado = ejercicio;
    this.formVisible = true;
    this.series = 0;
    this.repeticiones = 0;
    this.codigoEquipo = '';
  }
  guardarEjercicio() {
    if (!this.ejercicioSeleccionado) return;
    const nuevo: ItemRutinaEjercicio = {
      ejercicio: this.ejercicioSeleccionado,
      series: this.series,
      repeticiones: this.repeticiones,
      codigoEquipo: this.codigoEquipo
    };
    // Esto asegura que Angular detecte el cambio
  this.itemRutinaEjercicio = [...this.itemRutinaEjercicio, nuevo];
    this.formVisible = false;
  }

   eliminarEjercicio(index: number) {
    this.itemRutinaEjercicio.splice(index, 1);
  }

    editarEjercicio(index: number) {
    const e = this.itemRutinaEjercicio[index];
    this.ejercicioSeleccionado = e.ejercicio;
    this.series = e.series;
    this.repeticiones = e.repeticiones;
    this.codigoEquipo = e.codigoEquipo;
    this.formVisible = true;
    this.itemRutinaEjercicio.splice(index, 1); // para que al guardar lo reemplace
  }
}//end 
