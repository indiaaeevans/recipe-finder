import { Component, ElementRef, ViewChild } from '@angular/core';
import { ParamStoreService } from './services/param-store.service';
import { Router } from '@angular/router';
import { SearchOptions } from './models/search-options';

@Component({
  selector: 'app-root',
  template: `
    <span id="top-of-page"></span>
    <nav>
      <mat-toolbar color="primary">
        <section>
          <a routerLink="/home" mat-icon-button>
            <mat-icon aria-label="Home">home</mat-icon>
          </a>
        </section>
        <section>
          <a (click)="onSearchIconClick()" mat-icon-button disableRipple="true">
            <mat-icon aria-label="Search">search</mat-icon>
          </a>
          <form (ngSubmit)="onSearch()">
            <input
              #toolbarInput
              class="toolbar-input"
              placeholder="Search for a recipe"
              type="search"
              name="keyword search"
              [(ngModel)]="keyword"
            />
            <button aria-label="Search Button" type="submit" hidden></button>
          </form>
        </section>
      </mat-toolbar>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-finder-app';
  hideSearch = true;
  keyword: string;
  @ViewChild('toolbarInput') toolbarInput: ElementRef;

  constructor(private paramStore: ParamStoreService, private router: Router) {}
  onSearchIconClick() {
    this.hideSearch = false;
    this.toolbarInput.nativeElement.focus();
  }
  onSearch() {
    const query = {} as SearchOptions;
    if (this.keyword.trim().length > 0) {
      query.keyword = this.keyword.trim();
    }
    query.size = 10;
    query.offset = 0;
    this.paramStore.updateSearchParams(query);
    this.router.navigate(['/search'], { queryParams: query });
  }

  throwError() {
    throw new Error('My Pretty Error');
  }
}
