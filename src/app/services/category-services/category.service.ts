import { cateConverter } from '../converter/cates-converter';
import { Injectable } from '@angular/core';
import { Category } from '../../../shared/model/categories/category';
import {
  addDoc,
  collection,
  DocumentSnapshot,
  Firestore,
  getDocs,
  QuerySnapshot,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CatesService {
  constructor(private firestore: Firestore) {}

  async list(): Promise<Category[]> {
    const categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(cateConverter);
    const querySnapshot: QuerySnapshot<Category> = await getDocs(
      categoryCollection
    );

    return querySnapshot.docs.map(
      (docSnap: DocumentSnapshot<Category>) => docSnap.data()!
    );
  }

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(
      this.firestore,
      `categories/${id}`
    ).withConverter(cateConverter);
    const docSnap = await getDoc(categoryDocRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return undefined;
    }
  }
  async add(category: Category): Promise<void> {
    const categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(cateConverter);
    console.log(categoryCollection);
    if (category.id) {
      const categoryDocRef = doc(
        this.firestore,
        'categories',
        category.id
      ).withConverter(cateConverter);
      console.log(categoryDocRef);
      const data = cateConverter.toFirestore(category);
      await updateDoc(categoryDocRef, data);
    } else {
      await addDoc(categoryCollection, category);
      console.log('New category added to Firestore', category);
    }
  }
  async delete(id: string): Promise<void> {
    const categoryDocRef = doc(this.firestore, `categories/${id}`);
    await deleteDoc(categoryDocRef);
  }
}
