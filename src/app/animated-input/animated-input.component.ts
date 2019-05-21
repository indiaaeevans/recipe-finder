import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-animated-input',
  template: `
    <div class="search-form" [class.focus]="focus" [class.active]="active">
      <form>
        <input
          #myInput
          class="animated-input"
          [(ngModel)]="searchValue"
          name="quickSearch"
        />
        <button class="animated-button" (click)="onButtonClick()"></button>
      </form>
    </div>
  `,
  styleUrls: ['./animated-input.component.scss']
})
export class AnimatedInputComponent {
  title = 'recipe-finder-app';
  focus = false;
  active = false;
  searchValue = '';
  @ViewChild('myInput') myInput: ElementRef;

  onButtonClick() {
    // toggle
    this.active = !this.active;
    this.active
      ? this.myInput.nativeElement.focus()
      : this.myInput.nativeElement.blur();
  }

  onFocus() {
    this.focus = true;
  }

  onBlur() {
    this.searchValue.length !== 0 ? (this.focus = true) : (this.focus = false);
  }
}
