import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; // Necesario para mat-toolbar

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule  // Necesario para mat-toolbar
  ],
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <span>Header</span>
      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class HeaderComponent {
  @Input() isHandset: boolean = false; // Propiedad de entrada 'isHandset'
}
