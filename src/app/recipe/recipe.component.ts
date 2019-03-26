import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  template: `
    <p>
      recipe works!
    </p>
  `,
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
