import { TranslatedWord } from "./translated-word";

export class GamePlayed {
  
  words : TranslatedWord[] = [];
    date = new Date();
  constructor(
    public idCategory : number ,
    public numOfPoints : number ,
    public secondsLeftInGame : number ,
    public secondsPlayed : number ,
    public gamePlayedId : number , 
  ) { }

}
