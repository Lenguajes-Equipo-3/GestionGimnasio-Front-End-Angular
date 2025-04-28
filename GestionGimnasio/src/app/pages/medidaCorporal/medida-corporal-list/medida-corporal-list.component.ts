import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http'; // <-- AGREGA ESTO
import { MedidasService, Medida,Categoria } from '../../../services/medidas-corporales.service'; 

@Component({
  selector: 'app-medidas-corporales',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, HttpClientModule], // <-- AGREGA HttpClientModule aquí
  templateUrl: './medida-corporal-list.component.html',
  styleUrls: ['./medida-corporal-list.component.css']
})
export class MedidasCorporalesComponent implements OnInit {
  medidas: Medida[] = [];
  medidasAgrupadas: { [key: string]: Medida[] } = {};  
  categorias: Categoria[] = [];

  constructor(private medidasService: MedidasService) {}

  ngOnInit() {
    this.cargarMedidas();
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.medidasService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
      console.log('Categorías obtenidas:', this.categorias);
      this.agruparMedidasPorCategoria();
    });
  }
  cargarMedidas() {
    this.medidasService.obtenerMedidas().subscribe((data) => {
      this.medidas = data;
      console.log('Medidas obtenidas:', this.medidas);
    });
  }
  agruparMedidasPorCategoria() {
    this.medidasAgrupadas = {};  // Limpiar agrupación previa

    // Agrupar las medidas por el nombre de la categoría
    this.medidas.forEach(medida => {
      const categoria = this.categorias.find(c => c.idCategoria === medida.idCategoria);  // Buscar la categoría por id
      if (categoria) {
        const categoriaNombre = categoria.nombreCategoria;
        if (!this.medidasAgrupadas[categoriaNombre]) {
          this.medidasAgrupadas[categoriaNombre] = [];
        }
        this.medidasAgrupadas[categoriaNombre].push(medida);
      }
    });
  }
  editarMedida(medida: Medida) {
    console.log('Editar medida:', medida);
  }

  eliminarMedida(medida: Medida) {
    console.log('Eliminar medida:', medida);
  }
}
