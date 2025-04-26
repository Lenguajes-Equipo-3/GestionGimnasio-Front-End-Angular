import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategortiaEjercicioaAddComponent } from './categortia-ejercicioa-add.component';

describe('CategortiaEjercicioaAddComponent', () => {
  let component: CategortiaEjercicioaAddComponent;
  let fixture: ComponentFixture<CategortiaEjercicioaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategortiaEjercicioaAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategortiaEjercicioaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
