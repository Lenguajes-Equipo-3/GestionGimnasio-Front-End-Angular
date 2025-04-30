import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCategoriaEjercicioComponent } from './actualizar-categoria-ejercicio.component';

describe('ActualizarCategoriaEjercicioComponent', () => {
  let component: ActualizarCategoriaEjercicioComponent;
  let fixture: ComponentFixture<ActualizarCategoriaEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarCategoriaEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCategoriaEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
