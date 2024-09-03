export class TranslatedWord {
    guess:string;
    answer : boolean;
    constructor(
        public origin : string,
        public target: string) 
        {
            this.guess=""
            this.answer=false;
            
        }
}