import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoriaEjercicioService } from '../../../services/categoriaEjercicio.service';
import { Categoria } from '../../../Domain/CategoriaEjercicio.interface';
import { CategoriaEjercicioAddComponent } from '../categoria-ejercicio-add/categoria-ejercicio-add.component';
import { MatIconModule } from '@angular/material/icon';
import { ActualizarCategoriaEjercicioComponent } from '../actualizar-categoria-ejercicio/actualizar-categoria-ejercicio.component';

@Component({
  selector: 'app-categoria-ejercicio-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatDialogModule, MatIconModule],
  templateUrl: './categoria-ejercicio-list.component.html',
  styleUrls: ['./categoria-ejercicio-list.component.css']
})
export class CategoriaEjercicioListComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];
  searchText: string = '';

  constructor(
    private categoriaEjercicioService: CategoriaEjercicioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriaEjercicioService.getAllCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
        this.categoriasFiltradas = data;
      },
      (error: any) => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  filtrarCategorias() {
    const texto = this.searchText.toLowerCase();
    this.categoriasFiltradas = this.categorias.filter(cat =>
      cat.nombreCategoria.toLowerCase().includes(texto)
    );
  }

  abrirModalAgregarCategoria() {
    const dialogRef = this.dialog.open(CategoriaEjercicioAddComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.obtenerCategorias();
      }
    });
  }
  
  editarCategoria(categoria: Categoria): void {
    const dialogRef = this.dialog.open(ActualizarCategoriaEjercicioComponent, {
      width: '400px',
      data: categoria
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.obtenerCategorias(); // Reemplaza con tu lógica para refrescar la lista
      }
    });
  }
  
  eliminarCategoria(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriaEjercicioService.deleteCategoria(id).subscribe(
        () => {
          this.categorias = this.categorias.filter(cat => cat.idCategoria !== id);
          this.categoriasFiltradas = this.categoriasFiltradas.filter(cat => cat.idCategoria !== id);
        },
        (error: any) => {
          console.error('Error al eliminar la categoría:', error);
        }
      );
    }
  }
}
