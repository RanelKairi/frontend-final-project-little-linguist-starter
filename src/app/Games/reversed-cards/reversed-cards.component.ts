import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../../shared/model/categories/category';
import { TranslatedWord } from '../../../shared/model/categories/translated-word';
import { CatesService } from '../../services/category-services/category.service';
import { GameResultsService } from '../../services/game-services/game-results.service';
import { GameResult } from '../../../shared/model/games/game-result.';
// import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component'; // will be use in a moments
import { MatDialog } from '@angular/material/dialog';
import { MemoryGameCard } from '../../../shared/model/games/memory-game-cards.';

@Component({
  selector: 'app-reversed-cards',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './reversed-cards.component.html',
  styleUrls: ['./reversed-cards.component.css'],
})
export class ReversedCardsComponent implements OnInit {
  @Input() id?: string;
  selectedCate?: Category;
  isLoading = true;
  cards: MemoryGameCard[] = [];
  firstCard?: MemoryGameCard;
  secondCard?: MemoryGameCard;
  // pairOfCards:MemoryGameCard[]= []
  flippedCards: MemoryGameCard[] = [];
  words: TranslatedWord[] = [];
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
    if (!this.selectedCate) {
      return;
    } else {
      this.words = this.selectedCate.words;
      this.cards = this.shuffleCards([...this.words]);
      console.log('initializegame this.cards', this.cards);
      this.totalWords = this.selectedCate.words.length; // Track total pairs of words
    }
  }

  // Shuffle the words array and map each word into a card pair (origin & target)
  shuffleCards(words: TranslatedWord[]): MemoryGameCard[] {
    const cardArray = words
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

    // Shuffle the cards array
    return cardArray;
  }

  // Handle card click
  onCardClick(card: MemoryGameCard, cards: MemoryGameCard[]) {
    console.log(cards);

    if (!this.firstCard && !this.secondCard) {
      card.flipped = true;
      this.firstCard = card;
      this.flippedCards.push(card);
      console.log('oncard1stclick-1stCard', this.firstCard); // delete !
    } else if (this.firstCard && !this.secondCard) {
      card.flipped = true;
      this.secondCard = card;
      this.flippedCards.push(card);
      console.log('oncard2ndclick-2ndCard', this.secondCard); // delete !
    }
    if (this.firstCard && this.secondCard && this.flippedCards.length == 2) {
      console.log('EndOFonCardClick-Func =>flippedCards', this.flippedCards);
      this.checkMatch();
    }
  }
  // OLD VERSION BEFORE DELETE                                    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   if (this.flippedCards.length === 2) { // צריך להיות בסוף
  //     this.checkMatch()
  //     // this.flippedCards.
  //     console.log(this.flippedCards);
  //   }
  //   if (card) {
  //     this.flippedCards.push(card);
  //     console.log('onCArdClicked!!=>', this.flippedCards, card);
  //   }
  //   // if (card.flipped || card.matched || this.flippedCards.length === 2) return;

  //   // Flip the clicked card
  //   card.flipped = true;
  //   this.flippedCards.push(card);

  //   if (this.flippedCards.length === 2) {
  //     this.checkMatch();
  //   }
  //  // return card // will change inside the ifs just for now to make the error chilllllllll!!!
  //!!!!!!!!!!!!!!!!!??OLD VERSION BEFORE DELETE/!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //  }

  // Check if the flipped cards are a match (origin-target pair)
  checkMatch() {
    console.log('this.flipped CheckMatch(){}', this.flippedCards);
    if (this.flippedCards.length)
      // if (this.flippedCards.length === 2) {
      //   console.log('this.firstcard', this.firstCard);
      //   // const firstCard = this.flippedCards[0];
      //   // console.log("frstcard",firstCard)
      //   // console.log("scndCard",secondCard)
      // }
      // else if (this.isMatch(firstCard, secondCard)) {
      //   firstCard.matched = true;
      //   secondCard.matched = true;
      //   this.dialogService.open(FeedbackDialogComponent, {
      //     data: { isSucces: true },
      //   });
      // } else {
      //   this.score -= 2; // Deduct score for mismatch
      //   this.dialogService.open(FeedbackDialogComponent, {
      //     data: { isSucces: false },
      //   });
      //   setTimeout(() => {
      //     firstCard.flipped = false;
      //     secondCard.flipped = false;
      //   }, 1000);
      // }

      this.flippedCards = []; // Reset flipped cards
    console.log(this.flippedCards);
    this.attempts++;

    // End game when all cards are matched or score is 0
    if (this.cards.every((card) => card.matched) || this.score <= 0) {
      this.endGame();
    }
  }

  // Determine if two cards are a match (one origin, one target)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isMatch(firstCard: any, secondCard: any) {
    const firstWord = this.selectedCate?.words.find(
      (w) => w.origin === firstCard.word || w.target === firstCard.word
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
