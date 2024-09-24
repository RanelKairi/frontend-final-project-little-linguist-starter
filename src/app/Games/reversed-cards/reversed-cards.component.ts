import { Component, OnInit } from '@angular/core';
import { Card } from '../../../shared/model/card.';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../shared/model/category';
import { CatesService } from '../../services/cates.service';
import { FeedbackDialogComponent } from '../../in-game-comp/feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reversed-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reversed-cards.component.html',
  styleUrl: './reversed-cards.component.css'
})
export class ReversedCardsComponent implements OnInit{
  cards: Card[] = [];
  flippedCards: Card[] = [];
  attempts = 0;
  score = 100;
  totalWords = 0;
  selectedCate?: Category;  // Store selected category

  constructor(
    private cateService: CatesService,  // Service to fetch categories
    private route: ActivatedRoute ,
    public dialogService: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    const categoryId = this.route.snapshot.paramMap.get('id');
    
    if (categoryId) {
      this.selectedCate = await this.cateService.get(categoryId);  // Fetch category from Firestore
      if (this.selectedCate) {
        this.initializeGame();
      }
    }
  }

  initializeGame() {
    if (this.selectedCate) {
      // Generate cards from origin-target pairs in the category
      this.cards = this.shuffleCards(this.selectedCate.words.map(word => 
        new Card(word.origin, word.target),
        console.log(this.cards)  // Use origin as word and target as meaning
      ));

      this.totalWords = this.cards.length / 2;  // Total pairs
    }
  }

  // Shuffle the cards
  shuffleCards(cards: Card[]): Card[] {
    return cards.concat(cards)  // Duplicate for matching pairs
      .sort(() => Math.random() - 0.5);  // Shuffle the cards
  }

  // Handle card clicks
  onCardClick(card: Card) {
    // Prevent flipping more than two cards or if the card is already revealed/matched
    if (card.revealed || card.matched || this.flippedCards.length == 2) {
      return;
    }
    console.log(this.cards)

    // Reveal the clicked card
    card.revealed = true;
    this.flippedCards.push(card);
    console.log(this.flippedCards)
    // Check match only if two cards are flipped
    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }
  

  // Check if two flipped cards match
  checkMatch() {
    const [firstCard, secondCard] = this.flippedCards;
  
    // Check if one card's word matches the other's meaning (origin vs. target)
    const isMatch = (firstCard.word === secondCard.meaning) || (firstCard.meaning === secondCard.word);
  
    if (isMatch) {
      // If the cards match, mark them as matched
      firstCard.matched = true;
      secondCard.matched = true;
  
      // Provide feedback and increment points
      this.score += 10;  // Add points for a correct match
      this.showFeedback(true);
    } else {
      // If no match, flip the cards back after a short delay
      setTimeout(() => {
        firstCard.revealed = false;
        secondCard.revealed = false;
      }, 1000);
  
      // Deduct points for incorrect attempt
      this.score -= 2;  // Subtract points for wrong match
      this.showFeedback(false);
    }
  
    // Clear flipped cards
    this.flippedCards = [];
    this.attempts++;
  }
  
  showFeedback(isSuccess: boolean) {
    this.dialogService.open(FeedbackDialogComponent, {
      data: { success: isSuccess },
    });
  }
  
  

  // Calculate final score
  calculateFinalScore() {
    return Math.max(this.score, 0);  // Prevent score from going negative
  }
  
}