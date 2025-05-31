import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoleDialogComponent } from './select-role-dialog.component';

describe('SelectRoleDialogComponent', () => {
  let component: SelectRoleDialogComponent;
  let fixture: ComponentFixture<SelectRoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRoleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
