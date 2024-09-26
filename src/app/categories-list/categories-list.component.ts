import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { CatesService } from '../services/cates.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'numOfWords',
    'lastUpdateDate',
    'actions',
  ];
  dataSource: Category[] = [];
  categories: Category[] = [];

  constructor(
    // private categoryService: CategoriesService,
    private dialogService: MatDialog,
    private cateService: CatesService
  ) {}

  async ngOnInit() {
    this.dataSource = await this.cateService.list();
  }

  deleteCategory(id: string, name: string) {
    const dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, {
      data: name,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.cateService.delete(id);
        
        this.dataSource = await this.cateService.list();
      }
    });
  }
}
