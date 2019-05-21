export interface AnalyzedInstructions {
  name: string;
  steps: RecipeStep[];
}
export interface RecipeStep {
  number: number;
  step: string;
  ingredients: [
    {
      id: number;
      name: string;
      image: string;
    }
  ];
  equipment: [
    {
      id: number;
      name: string;
      image: string;
    }
  ];
}
