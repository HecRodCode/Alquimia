import { Component, input, model } from '@angular/core';

let uid = 0;

/**
 * Sección plegable accesible: el encabezado es un <button> con aria-expanded
 * y aria-controls apuntando a la región de contenido. Contenido vía <ng-content>.
 */
@Component({
  selector: 'app-collapsible-section',
  templateUrl: './collapsible-section.component.html',
  styleUrl: './collapsible-section.component.css',
})
export class CollapsibleSectionComponent {
  readonly title = input.required<string>();
  /** Emoji decorativo del encabezado. */
  readonly icon = input<string>('');
  readonly open = model<boolean>(true);

  protected readonly contentId = `collapsible-${uid++}`;

  toggle(): void {
    this.open.update((v) => !v);
  }
}
