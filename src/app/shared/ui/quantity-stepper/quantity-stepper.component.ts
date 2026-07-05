import { Component, computed, input, model } from '@angular/core';

/**
 * Stepper de cantidad reutilizable y sin conocimiento de negocio.
 * Two-way binding con model(): <app-quantity-stepper [(quantity)]="qty" />
 */
@Component({
  selector: 'app-quantity-stepper',
  templateUrl: './quantity-stepper.component.html',
  styleUrl: './quantity-stepper.component.css',
})
export class QuantityStepperComponent {
  readonly quantity = model.required<number>();
  readonly min = input<number>(1);
  readonly max = input<number>(99);
  /** Etiqueta accesible de lo que se está contando, ej. "Hamburguesa Crispy". */
  readonly label = input<string>('');

  protected readonly atMin = computed(() => this.quantity() <= this.min());
  protected readonly atMax = computed(() => this.quantity() >= this.max());

  protected readonly decLabel = computed(() =>
    this.label() ? `Quitar una unidad de ${this.label()}` : 'Quitar una unidad',
  );
  protected readonly incLabel = computed(() =>
    this.label() ? `Agregar una unidad de ${this.label()}` : 'Agregar una unidad',
  );

  step(delta: number): void {
    const next = this.quantity() + delta;
    if (next < this.min() || next > this.max()) return;
    this.quantity.set(next);
  }
}
