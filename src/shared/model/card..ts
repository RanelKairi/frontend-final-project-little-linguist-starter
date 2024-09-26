import { TranslatedWord } from "./translated-word";

export class Card {

  words:TranslatedWord[] = []
  constructor(
    // public word: string,
    // public meaning: string,
    public origin: string,
    public target : string,
    public revealed: boolean = false,
    public matched: boolean = false
  ) {
    this.words = []
  }
}
