import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list'; // Necesario para listas
import { MatToolbarModule } from '@angular/material/toolbar'; // Necesario para mat-toolbar
import { RouterModule } from '@angular/router'; // Necesario para routerLink

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatToolbarModule, // Necesario para mat-toolbar
    MatListModule,    // Necesario para mat-list
    RouterModule      // Necesario para routerLink
  ],
  template: `
    <mat-toolbar>Menú</mat-toolbar>
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard">Dashboard</a>
      <a *ngIf="role === 'admin'" mat-list-item routerLink="/admin">Admin</a>
      <a mat-list-item (click)="logout.emit()">Cerrar sesión</a>
    </mat-nav-list>
  `
})
export class SidebarComponent {
  @Input() role = '';        // Propiedad de entrada 'role'
  @Output() logout = new EventEmitter<void>(); // Emite logout
}
