import { Component, OnInit, OnDestroy, NgZone, ApplicationRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  // Estado del scroll
  isScrolled = false;

  constructor(private ngZone: NgZone, private appRef: ApplicationRef) {}

  ngOnInit() {
    // Ejecutar fuera de Angular para mejor rendimiento
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;

        // Solo actualizar si hay cambio para evitar actualizaciones innecesarias
        const currentIsScrolled = (window as any)._isScrolled;
        if (currentIsScrolled !== scrolled) {
          (window as any)._isScrolled = scrolled;

          // Volver a Angular para actualizar la vista
          this.ngZone.run(() => {
            this.isScrolled = scrolled;
          });
        }
      });
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => {});
  }

  // Propiedades del carrusel
  currentSlide = 0;
  carouselImages = [
    { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', alt: 'Salón moderno' },
    { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', alt: 'Dormitorio elegante' },
    { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Cocina contemporánea' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', alt: 'Oficina minimalista' },
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', alt: 'Baño de lujo' }
  ];

  // Navigation items
  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Quiénes somos', href: '#quienes-somos' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' }
  ];

  // Rutas de las imágenes
  backgroundImage = 'assets/background.webp';
  logoUrl = 'assets/logo.png';

  // Métodos del carrusel
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80';
  }
}
