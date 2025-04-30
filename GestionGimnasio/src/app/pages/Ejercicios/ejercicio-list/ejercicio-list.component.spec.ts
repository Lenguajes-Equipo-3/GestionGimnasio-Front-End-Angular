import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EjercicioListComponent } from './ejercicio-list.component';
import { EjercicioService } from '../../../services/ejercicio.service';

describe('EjercicioListComponent', () => {
  let component: EjercicioListComponent;
  let fixture: ComponentFixture<EjercicioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjercicioListComponent, HttpClientTestingModule],
      providers: [EjercicioService],
    }).compileComponents();

    fixture = TestBed.createComponent(EjercicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ejercicios on init', () => {
    spyOn(component, 'cargarEjercicios').and.callThrough();
    component.ngOnInit();
    expect(component.cargarEjercicios).toHaveBeenCalled();
  });
});