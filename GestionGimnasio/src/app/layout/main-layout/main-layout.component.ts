import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'; // Necesario para mat-sidenav
import { MatToolbarModule } from '@angular/material/toolbar'; // Necesario para mat-toolbar
import { MatButtonModule } from '@angular/material/button';   // Necesario para botones
import { MatIconModule } from '@angular/material/icon';      // Necesario para íconos de Material
import { RouterModule } from '@angular/router';               // Necesario para router-outlet
import { CommonModule } from '@angular/common';               // Necesario para *ngIf y otras directivas
import { FormsModule } from '@angular/forms';                 // Necesario para ngModel
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, // Necesario para *ngIf y otras directivas
    FormsModule,  // Necesario para ngModel
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SidebarComponent,  // Agrega SidebarComponent
    HeaderComponent    // Agrega HeaderComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  isHandset: boolean = false;
  role: string = 'admin';  // Ejemplo
  logout() {
    console.log("Logout clicked");
  }
}
