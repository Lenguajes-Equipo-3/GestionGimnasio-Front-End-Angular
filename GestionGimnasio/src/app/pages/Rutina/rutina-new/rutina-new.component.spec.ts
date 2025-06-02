import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaNewComponent } from './rutina-new.component';

describe('RutinaNewComponent', () => {
  let component: RutinaNewComponent;
  let fixture: ComponentFixture<RutinaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
