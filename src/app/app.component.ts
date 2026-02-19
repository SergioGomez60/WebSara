import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Quiénes somos', href: '#quienes-somos' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' }
  ];

  // Rutas de las imágenes
  backgroundImage = 'assets/background.webp';
  logoUrl = 'assets/logo.png';
}
