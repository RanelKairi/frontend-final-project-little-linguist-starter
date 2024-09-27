import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Language } from '../../shared/model/categories/language';
import { Category } from '../../shared/model/categories/category';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../shared/model/categories/translated-word';
import { CatesService } from '../services/category-services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit {
  currentCategory = new Category('', '', Language.English, Language.Hebrew);
  displayedColumns: string[] = ['Origin', 'Target', 'Actions'];

  @Input()
  id?: string;
  @ViewChild('wordsGroup') wordsGroup?: NgModelGroup;

  constructor(private router: Router, private cateService: CatesService) {}

  ngOnInit(): void {
    if (this.id) {
      this.loadCategory();
    }
  }

  async loadCategory() {
    const categoryData = await this.cateService.get(this.id!);
    if (categoryData) {
      this.currentCategory = categoryData;
    }
  }

  addWord() {
    this.currentCategory.words = [
      ...this.currentCategory.words,
      new TranslatedWord('', ''),
    ];
  }

  deleteWord(index: number) {
    const extendedWordsList = Array.from(this.currentCategory.words);
    extendedWordsList.splice(index, 1);
    this.currentCategory.words = extendedWordsList;
    this.wordsGroup!.control.markAsDirty();
  }

  async saveCategory() {
    try {
      await this.cateService.add(this.currentCategory);
      this.router.navigate(['']);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  }

  async deleteCategory() {
    if (this.id) {
      await this.cateService.delete(this.id);
      this.router.navigate(['']);
    }
  }
}
