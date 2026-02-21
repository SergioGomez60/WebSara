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

  // Proyectos para la sección con efecto scroll
  projects = [
    {
      number: 'Proyecto 1',
      title: 'Cocina Moderna con Isla',
      description: 'Cocina de diseño con isla central, armarios blancos lacados, taburetes de madera y iluminación colgante',
      image: 'assets/proyecto1.png'
    },
    {
      number: 'Proyecto 2',
      title: 'Sala de Estar Contemporánea',
      description: 'Salón con sofá gris en L, mesa de centro, zona de TV y gran ventanal con luz natural',
      image: 'assets/proyecto2.png'
    },
    {
      number: 'Proyecto 3',
      title: 'Dormitorio Minimalista',
      description: 'Dormitorio moderno con cabecera gris, mesitas de noche con lámparas y ventana amplia',
      image: 'assets/proyecto3.png'
    }
  ];

  activeProject = 0;
  isAtEnd = false;
  private observer: IntersectionObserver | null = null;

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

    // IntersectionObserver para el scroll de proyectos
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 100);
    });
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          this.ngZone.run(() => {
            this.activeProject = index;
            // Si es el último proyecto, activar el modo "at-end"
            this.isAtEnd = index === this.projects.length - 1;
          });
        }
      });
    }, options);

    // Observar las imágenes por su centro
    document.querySelectorAll('.project-image-scroll').forEach(img => {
      this.observer?.observe(img);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => {});
    if (this.observer) {
      this.observer.disconnect();
    }
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

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      email: formData.get('email'),
      presupuesto: formData.get('presupuesto')
    };

    console.log('Formulario enviado:', data);
    alert('¡Gracias por contactarnos! Te responderemos en un máximo de 24 horas.');
    form.reset();
  }
}
