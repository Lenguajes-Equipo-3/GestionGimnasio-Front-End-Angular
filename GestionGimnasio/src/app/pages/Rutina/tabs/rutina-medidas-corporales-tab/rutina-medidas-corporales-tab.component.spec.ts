import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaMedidasCorporalesTabComponent } from './rutina-medidas-corporales-tab.component';

describe('RutinaMedidasCorporalesTabComponent', () => {
  let component: RutinaMedidasCorporalesTabComponent;
  let fixture: ComponentFixture<RutinaMedidasCorporalesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaMedidasCorporalesTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaMedidasCorporalesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
