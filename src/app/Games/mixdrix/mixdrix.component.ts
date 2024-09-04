import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoriesService } from '../../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { GameRandomService } from '../../services/game-random.service';
import { Category } from '../../../shared/model/category';
import { GameProfile } from '../../../shared/model/GameProfile';
import { TranslatedWord } from '../../../shared/model/translated-word';

@Component({
  selector: 'app-mixdrix',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressBarModule,
    
  ],
  templateUrl: './mixdrix.component.html',
  styleUrl: './mixdrix.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixdrixComponent implements OnInit {
  @Input()
  id!: string;
  yid?: number;
  selectedCategory?: Category;
  cateWords: TranslatedWord[] = [];
  randomCateWords: TranslatedWord[] = [];
  selectedGame?: GameProfile;
  answer=''

  constructor(
    private CategoryService: CategoriesService,
    private randomService: GameRandomService,
    public dialogService: MatDialog
  ) {}

  ngOnInit(): void { // get out from on in it
    this.yid = +this.id;
    this.selectedCategory = this.CategoryService.get(this.yid);
    
    const originalArray = this.selectedCategory
    console.log(originalArray)
    this.cateWords = this.selectedCategory
      ? [...this.selectedCategory.words]
      : [];
      this.randomCateWords = [...this.cateWords]  
    this.randomCateWords = this.randomService.ordeRandom(this.randomCateWords);
    
    for(let i = this.cateWords.length -1 ; i>-1 ; i--){
      console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",i)

      console.log("ranDOM",this.randomCateWords[i])
      console.log("originalArray",this.selectedCategory?.words[i])
    }
  }
  checkAnswer(userAnswer:string){

  }
}
