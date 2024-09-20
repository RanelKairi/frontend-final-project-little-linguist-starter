import { Category } from '../../../shared/model/category';
import { TranslatedWord } from '../../../shared/model/translated-word';
import {
  QueryDocumentSnapshot,
  Timestamp,
  SnapshotOptions,
} from '@angular/fire/firestore';

export const cateConverter = {
  toFirestore: (cateToSave: Category) => {
    console.log('Category before Firestore conversion:', cateToSave)
    return {
      name: cateToSave.name,
      origin: cateToSave.origin,
      target: cateToSave.target,
      words: cateToSave.words.map((word) => ({
        origin: word.origin,
        target: word.target,
        guess: word.guess,
        answer: word.answer,
        categoryId: word.categoryId,
      })),
      
      lastUpdateDate: Timestamp.fromDate(cateToSave.lastUpdateDate), // Convert Date to Timestamp
    };
    console.log("cateToSave After conversion",cateToSave)
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Category => {
    const data = snapshot.data(options);

    // Create Category instance
    const category = new Category(
      snapshot.id,
      data['name'],
      data['origin'], // String back to enum (Language)
      data['target'] // String back to enum
    );

    // Convert Firestore's Timestamp back to Date
    if (data['lastUpdateDate']) {
      category.lastUpdateDate = (data['lastUpdateDate'] as Timestamp).toDate();
    }

    // Convert Firestore words array back into TranslatedWord instances
    const words = data['words'] || [];
    category.words = words.map(
      (word: any) => new TranslatedWord(word.origin, word.target)
    );

    return category;
    console.log("category",category)
  },
};
