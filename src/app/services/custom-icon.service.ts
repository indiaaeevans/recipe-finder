import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomIconService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}
  init() {
    this.iconRegistry.addSvgIcon(
      'vegan',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/seedling.svg')
    );
    this.iconRegistry.addSvgIcon(
      'vegetarian',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/carrot.svg')
    );
    this.iconRegistry.addSvgIcon(
      'dairy-free',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/dairy-free.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'gluten-free',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/gluten-free.svg'
      )
    );
  }
}
