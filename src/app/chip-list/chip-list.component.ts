import { Component, OnInit, Input } from '@angular/core';
import { IngredientStoreService } from '../services/ingredient-store.service';

@Component({
  selector: 'app-chip-list',
  template: `
    <mat-chip-list selectable="false">
      <mat-chip
        removable="true"
        *ngFor="let item of items"
        disableRipple="true"
        selected="true"
        (removed)="onRemoveChip(item)"
        [color]="color"
      >
        {{ item }}
        <mat-icon matChipRemove>cancel</mat-icon>
      </mat-chip>
    </mat-chip-list>
  `,
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {
  @Input() items: [];
  @Input() type: string;
  @Input() color: string;
  constructor(private ingStore: IngredientStoreService) {}

  ngOnInit() {}
  onRemoveChip(item) {
    this.ingStore.removeIngredient(this.type, item);
  }
}
