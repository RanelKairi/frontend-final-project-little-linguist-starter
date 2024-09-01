import { TranslatedWord } from "./translated-word";

export class GamePlayed {
  
  words : TranslatedWord[] = [];
    date = new Date();
  constructor(
    public categoryId : number ,
    public categoryIdStr: string,
    public grade : number ,
    public gamePlayedId : number , 

  ) {
    this.words = [];
   }

}
 // public secondsLeftInGame : number ,
    // public secondsPlayed : number ,