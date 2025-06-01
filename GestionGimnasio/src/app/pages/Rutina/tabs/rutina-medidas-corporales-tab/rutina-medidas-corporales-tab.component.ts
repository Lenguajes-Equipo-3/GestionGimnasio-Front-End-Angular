import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemRutinaMedida } from '../../../../Domain/ItemRutinaMedida';
import { Medida, MedidasService } from '../../../../services/medidas-corporales.service';
import { RutinaContextService } from '../../../../services/rutinaC.service';

@Component({
  selector: 'app-rutina-medidas-corporales-tab',
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './rutina-medidas-corporales-tab.component.html',
  styleUrl: './rutina-medidas-corporales-tab.component.css'
})

export class RutinaMedidasCorporalesTabComponent implements OnInit {
   medidasObligatorias: ItemRutinaMedida[] = [];
  medidasOpcionales: ItemRutinaMedida[] = [];

      constructor(private rutinaContextService: RutinaContextService) {}

      
    
  
    ngOnInit(): void {
    this.rutinaContextService.obtenerMedidas().subscribe((medidas: Medida[]) => {
      this.medidasObligatorias = medidas
        .filter(m => m.esObligatoria)
        .map(m => ({ medidaCorporal: m, valor: 0 }));

      this.medidasOpcionales = medidas
        .filter(m => !m.esObligatoria)
        .map(m => ({ medidaCorporal: m, valor: 0 }));
    });
  }
 todasObligatoriasLlenas(): boolean {
    return this.medidasObligatorias.every(item => item.valor !== null && item.valor !== undefined && item.valor > 0);
  }
 
guardarMedidas(): void {
  if (!this.todasObligatoriasLlenas()) {
    alert(' Por favor, complete todas las medidas obligatorias antes de continuar.');
    return;
  }

  const todasMedidas: ItemRutinaMedida[] = [
    ...this.medidasObligatorias,
    ...this.medidasOpcionales,
  ];

  // 
  console.log('Medidas a guardar:', todasMedidas);

  this.rutinaContextService.setMedidas(todasMedidas);
  alert('Medidas guardadas. Puede pasar al siguiente paso.');
}


  
}

