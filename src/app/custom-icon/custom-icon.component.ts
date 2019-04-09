import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-custom-icon',
  template: `
    <mat-icon [svgIcon]="this.name"></mat-icon>
  `,
  styleUrls: ['./custom-icon.component.scss']
})
export class CustomIconComponent {
  @Input() name: string;
  @Input() path: string;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      this.name,
      sanitizer.bypassSecurityTrustResourceUrl(this.path)
    );
  }
}
