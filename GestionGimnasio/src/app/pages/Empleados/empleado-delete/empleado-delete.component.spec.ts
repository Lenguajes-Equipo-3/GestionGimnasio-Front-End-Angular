import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDeleteComponent } from './empleado-delete.component';

describe('EmpleadoDeleteComponent', () => {
  let component: EmpleadoDeleteComponent;
  let fixture: ComponentFixture<EmpleadoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
