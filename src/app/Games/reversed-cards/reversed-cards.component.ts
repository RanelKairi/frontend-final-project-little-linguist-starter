import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../../shared/model/category';
import { TranslatedWord } from '../../../shared/model/translated-word';
import { CatesService } from '../../services/cates.service';
import { GameResultsService } from '../../services/game-results.service';
import { GameResult } from '../../../shared/model/game-result.';
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reversed-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule, 
    MatCardModule, 
  ],
  templateUrl: './reversed-cards.component.html',
  styleUrls: ['./reversed-cards.component.css'],
})
export class ReversedCardsComponent implements OnInit {
  @Input() id?: string; 
  selectedCate?: Category;
  cards: { word: string; isOrigin: boolean; flipped: boolean; matched: boolean }[] = [];
  flippedCards: any[] = [];
  score = 100;
  totalWords = 0;
  attempts = 0;
  gameId = 4;

  constructor(
    private cateService: CatesService,
    private gameResultsService: GameResultsService,
    public dialogService: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.id) {
      this.selectedCate = await this.cateService.get(this.id);
      if (this.selectedCate) {
        this.initializeGame(); 
      }
    }
  }

  async initializeGame(): Promise<void> {
    if (!this.selectedCate) return;

    // Generate cards from origin-target pairs and shuffle them
    this.cards = this.shuffleCards(this.selectedCate.words);
    this.totalWords = this.selectedCate.words.length; // Track total pairs of words
  }

  // Shuffle the words array and map each word into a card pair (origin & target)
  shuffleCards(words: TranslatedWord[]) {
    const cardArray = words.flatMap((word) => [
      { word: word.origin, isOrigin: true, flipped: false, matched: false },
      { word: word.target, isOrigin: false, flipped: false, matched: false },
    ]);

    // Shuffle the cards array
    return cardArray.sort(() => Math.random() - 0.5);
  }

  // Handle card click
  onCardClick(card: any) {
    if (card.flipped || card.matched || this.flippedCards.length === 2) return;

    // Flip the clicked card
    card.flipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }

  // Check if the flipped cards are a match (origin-target pair)
  checkMatch() {
    const [firstCard, secondCard] = this.flippedCards;

    if (this.isMatch(firstCard, secondCard)) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.dialogService.open(FeedbackDialogComponent,{
        data:{isSucces:true}}
      )
    } else {
      this.score -= 2; // Deduct score for mismatch
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
      }, 1000);
      this.dialogService.open(FeedbackDialogComponent,{
        data:{isSucces :false}
      })
    }

    this.flippedCards = []; // Reset flipped cards
    this.attempts++;

    // End game when all cards are matched or score is 0
    if (this.cards.every((card) => card.matched) || this.score <= 0) {
      this.endGame();
    }
  }

  // Determine if two cards are a match (one origin, one target)
  isMatch(firstCard: any, secondCard: any) {
    const firstWord = this.selectedCate?.words.find((w) =>
      w.origin === firstCard.word || w.target === firstCard.word
    );
    return (
      firstWord && 
      ((firstCard.isOrigin && firstWord.target === secondCard.word) || 
      (!firstCard.isOrigin && firstWord.origin === secondCard.word))
    );
  }

  // End game and save result to Firestore
  async endGame() {
    const gameResult = new GameResult(
      this.selectedCate?.id || 'unknown',
      this.gameId,
      new Date(),
      this.score
    );
    await this.gameResultsService.addGameResult(gameResult);
    console.log('Game result saved:', gameResult);
  }

  // Reset button to clear input and retry
  reset() {
    this.flippedCards = [];
  }
}
