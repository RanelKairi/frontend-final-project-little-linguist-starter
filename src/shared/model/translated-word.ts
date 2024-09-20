export class TranslatedWord {
  guess: string;
  answer: boolean;
  categoryId: number;

  
  constructor(public origin: string, public target: string) {
    this.guess = '';
    this.answer = false;
    this.categoryId = 0;
  }
}
