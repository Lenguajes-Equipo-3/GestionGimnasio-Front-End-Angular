import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MedidasService, Medida,Categoria } from '../../../services/medidas-corporales.service'; 
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditarMedidaDialogComponent } from '../editar-medida-dialog/editar-medida-dialog.component';
import { AgregarMedidaDialogComponent } from '../agregar-medida/agregar-medida.component';


@Component({
  selector: 'app-medidas-corporales',
  standalone: true,
  imports: [CommonModule,
     MatCardModule, 
     MatIconModule,
     HttpClientModule,
     MatDialogModule
    ], 
  templateUrl: './medida-corporal-list.component.html',
  styleUrls: ['./medida-corporal-list.component.css']
})
export class MedidasCorporalesComponent implements OnInit {
  medidas: Medida[] = [];
  medidasAgrupadas: { [key: string]: Medida[] } = {};  
  categorias: Categoria[] = [];

  constructor(private medidasService: MedidasService,  private dialog: MatDialog) {}
 
  ngOnInit() {
    this.medidasService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      console.log('Categorías cargadas:', this.categorias);
  
      this.medidasService.obtenerMedidas().subscribe((medidas) => {
        this.medidas = medidas;
        console.log('Medidas cargadas:', this.medidas);
        this.agruparMedidasPorCategoria();
      });
    });
  }

  agruparMedidasPorCategoria() {
    this.medidasAgrupadas = {};  
    // Agrupar las medidas por el nombre de la categoría
    this.medidas.forEach(medida => {
      const categoria = this.categorias.find(c => c.idCategoria === medida.idCategoria); 
      if (categoria) {
        const categoriaNombre = categoria.nombreCategoria;
        if (!this.medidasAgrupadas[categoriaNombre]) {
          this.medidasAgrupadas[categoriaNombre] = [];
        }
        this.medidasAgrupadas[categoriaNombre].push(medida);
      }
    });
  }

  agregarMedida(categoria: any) {
    const dialogRef = this.dialog.open(AgregarMedidaDialogComponent, {
      width: '500px',
      data: {
        categorias: this.categorias,
        idCategoriaSeleccionada: categoria.idCategoria 
      },      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.ngOnInit();
      }
    });}
  
  editarMedida(medida: Medida): void {
    console.log('Editar medida', medida);

    const dialogRef = this.dialog.open(EditarMedidaDialogComponent, {
      width: '500px',
      data: {
        medida,
        categorias: this.categorias
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
    
  }

  
  eliminarMedida(medida: Medida): void {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar esta medida?');
    if (confirm) {
      this.medidasService.eliminarMedida(medida.idMedida).subscribe(() => {
       this.ngOnInit();
      });
    }
  }
  
  
}
