import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-role-dialog',
  standalone: true,
  templateUrl: './select-role-dialog.component.html',
  styleUrls: ['./select-role-dialog.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ]
})
export class SelectRoleDialogComponent {
  selectedRol: string = '';

  constructor(
    public dialogRef: MatDialogRef<SelectRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roles: string[] }
  ) {}

  confirmar(): void {
    this.dialogRef.close(this.selectedRol);
  }
}