import { Component, input, output } from '@angular/core';
import { Category } from '../../../core/models';

@Component({
  selector: 'app-category-chip',
  templateUrl: './category-chip.component.html',
  styleUrl: './category-chip.component.css',
  host: {
    '[attr.data-world]': 'category().id',
  },
})
export class CategoryChipComponent {
  readonly category = input.required<Category>();
  readonly active = input<boolean>(false);
  readonly select = output<void>();
}
