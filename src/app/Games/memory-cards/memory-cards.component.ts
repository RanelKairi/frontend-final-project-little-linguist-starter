import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../../shared/model/games/card.'; // should get deleted anyway
import { CatesService } from '../../services/category-services/category.service';
import { GameProfile } from '../../../shared/model/games/game-profile';
import { Category } from '../../../shared/model/categories/category';
import { MatDialog } from '@angular/material/dialog';
import { TranslatedWord } from '../../../shared/model/categories/translated-word';
import { MemoryGameCard } from '../../../shared/model/games/memory-game-cards.';

@Component({
  selector: 'app-memory-cards',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatIconModule],
  templateUrl: './memory-cards.component.html',
  styleUrl: './memory-cards.component.css',
})
export class MemoryCardsComponent implements OnInit {
  selectedGame = new GameProfile(
    6,
    'Memory-Cards',
    '!~this is a memory cards game, ~WARNING~ not a game for begginers , think you got a good memory? prove it here~! !',
    'Games/card-matching'
  );

  @Input() id?: string;
  selectedCate?: Category;
  words: TranslatedWord[] = [];
  card: Card[] = [];
  cards: MemoryGameCard[] = [];
  frstCardIndex: number | null = null;
  scndCardIndex: number | null = null;
  attempts = 0;
  score = 100;
  isGameEnd =false;

  constructor(
    private cateService: CatesService,
    public dialogService: MatDialog
  ) {}

  ngOnInit() {
    if (this.id) {
      this.initializeGame();
    }
  }

  async initializeGame(): Promise<void> {
    if (this.id) {
      const cateId = this.id;
      this.selectedCate = await this.cateService.get(cateId);
      if (this.selectedCate) {
        this.words = this.selectedCate.words;
        this.cards = this.shuffleCards([...this.words]);
        console.log('this.cards', this.cards);
      } else {
        console.error('category not found');
      }
    } else {
      console.error(`id not found`);
    }
  }
  shuffleCards(words: TranslatedWord[]): MemoryGameCard[] {
    console.log('words before shuffle ', words);
    const shuffled = words
      .map((word) => ({
        word: word.origin,
        flipped: false,
        matched: false,
        direction: word.origin,
        translation: word.target,
      }))
      .concat(
        words.map((word) => ({
          word: word.target,
          flipped: false,
          matched: false,
          direction: word.target,
          translation: word.origin,
        }))
      )
      .sort();
    // .sort(() => Math.random() - 0.5); // לא לשכוח להחזיר את זה!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('shuffled', shuffled);
    if (shuffled) {
      console.log('jehri');
    }
    return shuffled;
  }

  
  onCardClick(index: number): void {
    if (this.frstCardIndex === null) {
      this.frstCardIndex = index;
      this.cards[index].flipped = true;
    } else if (this.scndCardIndex === null && index !== this.frstCardIndex) {
      this.scndCardIndex = index;
      this.cards[index].flipped = true;
      this.attempts++;

      setTimeout(() => {
        this.checkMatch();
      }, 1000);
    }
  }
  checkMatch() {
    const firstCard = this.cards[this.frstCardIndex!];
    const secondCard = this.cards[this.scndCardIndex!];

    if (
      this.words.some(
        (w) => w.origin === firstCard.word && w.target === secondCard.word
      ) ||
      this.words.some(
        (w) => w.target === firstCard.word && w.origin === secondCard.word
      )
    ) {
      firstCard.matched = true;
      secondCard.matched = true;
      firstCard.flipped = true;
      secondCard.flipped = true;
    } else {
      firstCard.matched = false;
      firstCard.flipped = false;
      secondCard.matched = false;
      secondCard.flipped = false;
      this.score -= 2;
    }
    this.frstCardIndex = null;
    this.scndCardIndex = null;
  }

  isEndGame(): boolean {
    
    return this.cards.every((card) => card.matched);

  }

  resetgame(): void {
    this.frstCardIndex = null;
    this.scndCardIndex = null;
    this.attempts = 0;
    this.score = 100;
    this.cards = this.shuffleCards([...this.words, ...this.words]);
  }
}
