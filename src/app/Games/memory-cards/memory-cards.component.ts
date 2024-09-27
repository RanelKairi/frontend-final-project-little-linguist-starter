import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CatesService } from '../../services/category-services/category.service';
import { GameProfile } from '../../../shared/model/games/game-profile';
import { Category } from '../../../shared/model/categories/category';
import { MatDialog } from '@angular/material/dialog';
import { TranslatedWord } from '../../../shared/model/categories/translated-word';
import { MemoryGameCard } from '../../../shared/model/games/memory-game-cards.';
import { SelectGameCategoryDialogComponent } from '../../select-game-category-dialog/select-game-category-dialog.component';
import { GameResultsService } from '../../services/game-services/game-results.service';
import { GameResult } from '../../../shared/model/games/game-result.';

@Component({
  selector: 'app-memory-cards',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatIconModule],
  templateUrl: './memory-cards.component.html',
  styleUrl: './memory-cards.component.css',
})
export class MemoryCardsComponent implements OnInit {
  currentGame = new GameProfile(
    6,
    'Memory-Cards',
    'Memory Card Game Difficulty: HARD',
    'Games/memory-cards'
  );

  @Input() id?: string;
  selectedCate?: Category;
  words: TranslatedWord[] = [];
  cards: MemoryGameCard[] = [];
  frstCardIndex: number | null = null;
  scndCardIndex: number | null = null;
  attempts = 0;
  score = 100;
  isGameEnd = false;
  chooseAnotherCate = false;

  constructor(
    private cateService: CatesService,
    public dialogService: MatDialog,
    private gameResultsService : GameResultsService
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
      } else {
        console.error('category not found');
      }
    } else {
      console.error(`id not found`);
    }
  }
  shuffleCards(words: TranslatedWord[]): MemoryGameCard[] {
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
      .sort(() => Math.random() - 0.5);
    if (shuffled) {
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
      if (this.cards.every((card) => card.matched) == true) {
        this.isGameEnd = true;
        if(this.isGameEnd){
          this.endGameSaveResults()
        }
      }
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

  async endGameSaveResults() {
    const gameResult = new GameResult(
      this.selectedCate!.id,
      this.currentGame.id!,
      new Date(),
      this.score
    );
    await this.gameResultsService.addGameResult(gameResult);
  }

  resetgame(): void {
    window.location.reload();
  }

  anotherCate() {
    this.chooseAnotherCate = true;
    this.isGameEnd = true;
    const dialogRef = this.dialogService.open(
      SelectGameCategoryDialogComponent,
      {
        data: this.currentGame,
      }
    );
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {

        window.location.reload();
      }
    });
  }
}
