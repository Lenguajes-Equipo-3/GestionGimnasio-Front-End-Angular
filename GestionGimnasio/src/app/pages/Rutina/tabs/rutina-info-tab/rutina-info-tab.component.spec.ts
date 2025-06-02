import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaInfoTabComponent } from './rutina-info-tab.component';

describe('RutinaInfoTabComponent', () => {
  let component: RutinaInfoTabComponent;
  let fixture: ComponentFixture<RutinaInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaInfoTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
