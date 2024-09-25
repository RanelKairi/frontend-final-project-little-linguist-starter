import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Card } from '../../../shared/model/card.';
import { Category } from '../../../shared/model/category';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { CatesService } from '../../services/cates.service';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-card-matching',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card-matching.component.html',
  styleUrl: './card-matching.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMatchingComponent implements OnInit {
  @Input() id?: string;
  //given for now
  cards: Card[] = [];
  flippedCards: Card[] = [];
  //
  score = 100;
  attempts = 0;
  totalPairs = 0;
  selectedCate?: Category;
  clickedWord?: TranslatedWord;
  clickedWord2?: TranslatedWord;
  words: TranslatedWord[] = [];
  words2: TranslatedWord[] = [];
  index = 0;

  constructor(private cateService: CatesService) {}

  async ngOnInit(): Promise<void> {
    if (this.id) {
      this.selectedCate = await this.cateService.get(this.id);
      if (this.selectedCate) {
        this.initializeGame();
      }
    }
  }

  initializeGame() {
    if (this.selectedCate) {
      this.words = [...this.selectedCate.words];  // Original words
      this.words2 = [...this.selectedCate.words]; // Target words
      this.shuffle(this.words);
      this.shuffle(this.words2);
    }
  }
  shuffle(array: TranslatedWord[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // consider adding another boolean var to Translated word
  onCardClick(word: TranslatedWord | any) {
    if (!this.clickedWord) {
      this.clickedWord = word;
      // this.clickedWord.flipped = true ;
      console.log("firstflip",this.clickedWord)
    } else if(!this.clickedWord2) {
      this.clickedWord2 = word;
      // this.clickedWord2.flipped = true;
      console.log('secondflip2', this.clickedWord2);
    }
    
    

    if (this.clickedWord && this.clickedWord2) {
      this.checkMatch();
    }
  }
  checkMatch() {
    if (this.clickedWord2 && this.clickedWord) {
      const firstCard = this.clickedWord;
      const secondCard = this.clickedWord2;
      // /const isMatch = firstCard === secondCard;
      const isMatch = this.clickedWord.origin === this.clickedWord2.target
      if (isMatch) {
        this.clickedWord.answer = true;
        this.clickedWord2.answer =true;
      } else {
        const clickedWordCopy = this.clickedWord;
      const clickedWord2Copy = this.clickedWord2;
        setTimeout(() => {
          if(clickedWordCopy&&clickedWord2Copy)
clickedWordCopy.flipped = false;
clickedWord2Copy!.flipped = false;
        },1000);
        
      }
      this.clickedWord2 = undefined;
      this.clickedWord = undefined;
    }
  }
}
