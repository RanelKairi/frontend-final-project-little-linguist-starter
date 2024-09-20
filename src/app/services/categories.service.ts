// to be deleted
// import { categories } from './../../shared/data/categories';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
// import { TranslatedWord } from '../../shared/model/translated-word';
import {
  addDoc,
  collection,
  DocumentSnapshot,
  Firestore,
  getDocs,
  QuerySnapshot,
  // getFirestore
} from '@angular/fire/firestore';
import { categoryConverter } from './converter/category-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  // list not finish , converter shoould be handled
  async list(): Promise<Category[]> {
    const categoryCollection = collection(
      this.firestore,
      "categories"
    ).withConverter(categoryConverter);

    const querySnapshot: QuerySnapshot<Category> = await getDocs(
      categoryCollection
    );

    const result: Category[] = [];

    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });

    return result;
  }

  get(id: string): Category | undefined {
    return undefined;
  }

  async add(category: Category) {
    const categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(categoryConverter);
    console.log("coll",categoryCollection,"Conve",categoryConverter)
    await addDoc(categoryCollection, category);
  }

  // handle later
  update(category: Category): void {}
  // handle later
  delete(id: string): void {}
}
