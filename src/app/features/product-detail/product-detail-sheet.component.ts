import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Product, ProductBadge, ProductSelection } from '../../core/models';
import { CollapsibleSectionComponent } from '../../shared/ui/collapsible-section/collapsible-section.component';
import { QuantityStepperComponent } from '../../shared/ui/quantity-stepper/quantity-stepper.component';
import { CartService } from '../cart/cart.service';

interface BadgeView {
  readonly label: string;
  readonly icon: string;
}

const BADGE_VIEW: Record<ProductBadge, BadgeView> = {
  top: { label: 'Top ventas', icon: '🔥' },
  picante: { label: 'Picante', icon: '🌶️' },
  nuevo: { label: 'Nuevo', icon: '✨' },
  recomendado: { label: 'Recomendado', icon: '👍' },
};

/** Emoji decorativo por adición, deducido de la palabra clave del label. */
const EXTRA_EMOJI: ReadonlyArray<readonly [string, string]> = [
  ['queso', '🧀'],
  ['tocineta', '🥓'],
  ['huevo', '🥚'],
  ['aguacate', '🥑'],
  ['patacon', '🍌'],
  ['camaron', '🦐'],
  ['pan', '🥖'],
  ['arroz', '🍚'],
  ['salsa', '🥫'],
  ['jalape', '🌶️'],
  ['aros', '🧅'],
  ['frutos', '🫐'],
  ['helado', '🍨'],
  ['arequipe', '🍯'],
  ['salchicha', '🌭'],
  ['papa', '🍟'],
];

const NOTE_SUGGESTIONS = ['Bien cocido', 'Poco picante', 'Salsa aparte', 'Para llevar'] as const;

@Component({
  selector: 'app-product-detail-sheet',
  imports: [ReactiveFormsModule, CollapsibleSectionComponent, QuantityStepperComponent],
  templateUrl: './product-detail-sheet.component.html',
  styleUrl: './product-detail-sheet.component.css',
  host: {
    '[attr.data-world]': 'product().categoryId',
    '(document:keydown.escape)': 'close.emit()',
  },
})
export class ProductDetailSheetComponent {
  private readonly fb = inject(FormBuilder);
  private readonly cart = inject(CartService);

  readonly product = input.required<Product>();
  readonly close = output<void>();
  readonly added = output<void>();

  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  readonly form = this.fb.group({
    size: this.fb.control<string | null>(null),
    extras: this.fb.nonNullable.control<string[]>([]),
    removed: this.fb.nonNullable.control<string[]>([]),
    notes: this.fb.nonNullable.control(''),
  });

  protected readonly quantity = signal(1);
  protected readonly imageFailed = signal(false);
  protected readonly noteSuggestions = NOTE_SUGGESTIONS;

  private readonly formValue = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });

  protected readonly badge = computed<BadgeView | null>(() => {
    const b = this.product().badge;
    return b ? BADGE_VIEW[b] : null;
  });

  protected readonly selection = computed<ProductSelection>(() => {
    const v = this.formValue();
    return {
      sizeId: v.size ?? null,
      extraIds: v.extras ?? [],
      removedIngredientIds: v.removed ?? [],
      notes: v.notes ?? '',
    };
  });

  protected readonly unitPrice = computed(() =>
    this.cart.computeUnitPrice(this.product(), this.selection()),
  );

  protected readonly totalPrice = computed(() => this.unitPrice() * this.quantity());

  protected readonly totalLabel = computed(
    () => `$${this.totalPrice().toLocaleString('es-CO')}`,
  );

  protected readonly basePriceLabel = computed(
    () => `$${this.product().basePrice.toLocaleString('es-CO')}`,
  );

  constructor() {
    // Preselecciona el primer tamaño cuando el producto tiene opciones.
    effect(() => {
      const sizes = this.product().customization.sizes;
      if (sizes.length > 0 && this.form.controls.size.value === null) {
        this.form.controls.size.setValue(sizes[0].id);
      }
    });

    // Foco inicial en el botón de cerrar (accesibilidad al abrir el diálogo).
    afterNextRender(() => this.closeBtn()?.nativeElement.focus());
  }

  selectSize(sizeId: string): void {
    this.form.controls.size.setValue(sizeId);
  }

  isExtraSelected(id: string): boolean {
    return (this.formValue().extras ?? []).includes(id);
  }

  toggleExtra(id: string): void {
    const current = this.form.controls.extras.value;
    this.form.controls.extras.setValue(
      current.includes(id) ? current.filter((e) => e !== id) : [...current, id],
    );
  }

  isRemoved(id: string): boolean {
    return (this.formValue().removed ?? []).includes(id);
  }

  toggleRemoved(id: string): void {
    const current = this.form.controls.removed.value;
    this.form.controls.removed.setValue(
      current.includes(id) ? current.filter((r) => r !== id) : [...current, id],
    );
  }

  addNote(text: string): void {
    const current = this.form.controls.notes.value.trim();
    const parts = current ? current.split(/\s*·\s*/) : [];
    if (parts.includes(text)) return;
    this.form.controls.notes.setValue([...parts, text].join(' · '));
  }

  emojiForExtra(label: string): string {
    const l = label.toLowerCase();
    return EXTRA_EMOJI.find(([kw]) => l.includes(kw))?.[1] ?? '➕';
  }

  priceLabel(price: number): string {
    return `+$${price.toLocaleString('es-CO')}`;
  }

  addToCart(): void {
    this.cart.add(this.product(), this.selection(), this.quantity());
    this.added.emit();
    this.close.emit();
  }
}
