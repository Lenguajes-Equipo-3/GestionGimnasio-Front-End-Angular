import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategortiaEjercicioListComponent } from './categortia-ejercicio-list.component';

describe('CategortiaEjercicioListComponent', () => {
  let component: CategortiaEjercicioListComponent;
  let fixture: ComponentFixture<CategortiaEjercicioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategortiaEjercicioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategortiaEjercicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
