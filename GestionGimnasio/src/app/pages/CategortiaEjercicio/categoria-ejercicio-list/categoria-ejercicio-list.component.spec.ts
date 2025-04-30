import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEjercicioListComponent } from './categoria-ejercicio-list.component';

describe('CategortiaEjercicioListComponent', () => {
  let component: CategoriaEjercicioListComponent;
  let fixture: ComponentFixture<CategoriaEjercicioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaEjercicioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaEjercicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
