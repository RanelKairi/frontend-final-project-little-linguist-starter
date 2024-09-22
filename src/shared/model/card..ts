import { Language } from "./language";
import { TranslatedWord } from "./translated-word";

export class Card {

  words:TranslatedWord[] = []
  constructor(
    public word: string,
    public meaning: string,
    // public origin: Language,
    // public target : Language,
    public revealed: boolean = false,
    public matched: boolean = false
  ) {}
}
