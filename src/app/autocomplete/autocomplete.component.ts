import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  startWith,
  debounceTime,
  switchMap,
  distinctUntilChanged
} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import {
  AutocompleteService,
  IngredientResponse
} from '../autocomplete.service';
import { IngredientStoreService } from '../ingredient-store.service';

@Component({
  selector: 'app-autocomplete',
  template: `
    <mat-form-field class="autocomplete">
      <input
        #chipInput
        matChipInput
        type="text"
        [placeholder]="placeholder"
        aria-label="Autocomplete"
        matInput
        [formControl]="autoCompleteControl"
        [matAutocomplete]="auto"
      />
      <mat-autocomplete
        #auto="matAutocomplete"
        autoActiveFirstOption
        (optionSelected)="addChip($event, chipInput)"
      >
        <mat-option
          *ngFor="let option of (autocomplete$ | async)"
          [value]="option.name"
        >
          {{ option.name }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  autoCompleteControl = new FormControl();
  public autocomplete$: Observable<IngredientResponse> = null;
  @Input() placeholder: string;
  @Input() type: string;

  constructor(
    private acService: AutocompleteService,
    private ingStore: IngredientStoreService
  ) {}

  ngOnInit() {
    this.autocomplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => {
        // console.log('value changed to: ', value);
        return value ? this.lookup(value) : of(null);
      })
    );
  }

  lookup(value: string): Observable<IngredientResponse> {
    if ((value || '').trim()) {
      console.log('looking up ', value);
      return this.acService.search(value.toLowerCase());
    }
  }

  addChip(event: MatAutocompleteSelectedEvent, input: any) {
    const selection = event.option.value;
    if ((selection || '').trim()) {
      this.ingStore.addIngredient(this.type, selection.trim());
    }
    if (input) {
      input.value = '';
    }
    this.autoCompleteControl.setValue(null);
  }
}
