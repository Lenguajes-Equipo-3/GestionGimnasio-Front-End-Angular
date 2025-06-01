import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaEjerciciosTabComponent } from './rutina-ejercicios-tab.component';

describe('RutinaEjerciciosTabComponent', () => {
  let component: RutinaEjerciciosTabComponent;
  let fixture: ComponentFixture<RutinaEjerciciosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaEjerciciosTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaEjerciciosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
