import { TranslatedWord } from "./translated-word"
export class LastGame {
  words:TranslatedWord[] = []
  constructor(
    public answer : boolean,
  ) {
    this.words=[]
   }

}
