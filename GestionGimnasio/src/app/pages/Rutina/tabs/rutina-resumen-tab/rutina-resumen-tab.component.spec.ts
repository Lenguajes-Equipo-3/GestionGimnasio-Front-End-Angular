import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaResumenTabComponent } from './rutina-resumen-tab.component';

describe('RutinaResumenTabComponent', () => {
  let component: RutinaResumenTabComponent;
  let fixture: ComponentFixture<RutinaResumenTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaResumenTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaResumenTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
