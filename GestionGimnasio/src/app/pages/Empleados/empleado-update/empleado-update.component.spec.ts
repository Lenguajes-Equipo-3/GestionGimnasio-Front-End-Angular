import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoUpdateComponent } from './empleado-update.component';

describe('EmpleadoUpdateComponent', () => {
  let component: EmpleadoUpdateComponent;
  let fixture: ComponentFixture<EmpleadoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
