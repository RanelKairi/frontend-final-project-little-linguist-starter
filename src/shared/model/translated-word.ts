export class TranslatedWord {
  guess: string;
  answer: boolean;
  flipped:boolean;
  categoryId: number;

  
  constructor(public origin: string, public target: string) {
    this.guess = '';
    this.answer = false;
    this.flipped = false;
    this.categoryId = 0;
  }
}
