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

@Component({
  selector: 'app-card-matching',
  standalone: true,
  imports: [CommonModule],
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
        console.log(this.selectedCate);
        this.initializeGame();
      }
    }
  }

  initializeGame() {
    if (this.selectedCate) this.words = [...this.selectedCate?.words];
    this.words2 = [...this.words];
    console.log(this.words);
    this.splitWordToCards();
  }

  splitWordToCards() {}

  // consider adding another boolean var to Translated word
  onCardClick(word: TranslatedWord) {
    console.log(word);
    if (this.clickedWord) {
      this.clickedWord2 = word;
      this.clickedWord2.flipped = true;
    } else {
      this.clickedWord = word;
      this.clickedWord.flipped = true;
    }
    console.log('firstflip', this.clickedWord);
    console.log('secondflip2', this.clickedWord2);

    if (this.clickedWord && this.clickedWord2) {
      this.checkMatch();
    }
  }
  checkMatch() {
    if (this.clickedWord2 && this.clickedWord) {
      const firstCard = this.clickedWord;
      const secondCard = this.clickedWord2;
      const isMatch = firstCard === secondCard;
      if (!isMatch) {
        console.log('you did wrong fucker!');
        this.clickedWord.answer = false;
        this.clickedWord = undefined;
        this.clickedWord2.answer = false;
        this.clickedWord2 = undefined;
      } else {
        this.clickedWord.answer = true;
        this.clickedWord.answer = true;
        this.clickedWord2.answer = true;
        console.log('YouDidIT~!');
      }
      this.clickedWord2 = undefined;
      this.clickedWord = undefined;
    }
  }
}
