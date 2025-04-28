import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedidasCorporalesComponent } from './medida-corporal-list.component';

describe('MedidaCorporalListComponent', () => {
  let component: MedidasCorporalesComponent;
  let fixture: ComponentFixture< MedidasCorporalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MedidasCorporalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent( MedidasCorporalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
