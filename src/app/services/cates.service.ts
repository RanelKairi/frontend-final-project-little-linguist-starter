import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
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
import { cateConverter } from './converter/cates-converter';

@Injectable({
  providedIn: 'root',
})
export class CatesService {
  constructor(private firestore: Firestore) {}

  // a ! added after doc.snap.data() ask about it
  async list(): Promise<Category[]> {
    // maybe adding options?
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

  //ask for an explanation on exists
  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(
      this.firestore,
      `categories/${id}`
    ).withConverter(cateConverter);
    const docSnap = await getDoc(categoryDocRef);

    // exists?
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return undefined;
    }
  }
  // Add a new category to Firestore // already checked and worked
  async add(category: Category): Promise<void> {
    const categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(cateConverter);
    await addDoc(categoryCollection, category);
    console.log('afteraddDoc- categoryCol', categoryCollection);
    console.log('afteraddDoc- category', category);
    console.log('afteraddDoc- this.firestore', this.firestore);
  }

  // Update a category ready to check
  async update(category: Category): Promise<void> {
    const categoryDocRef = doc(this.firestore, `categories/${category.id}`);
    await updateDoc(categoryDocRef, {
      name: category.name,
      origin: category.origin,
      target: category.target,
      words: category.words,
      lastUpdateDate: category.lastUpdateDate,
    });
  }
  // ready to check
  async delete(id: string): Promise<void> {
    const categoryDocRef = doc(this.firestore, `categories/${id}`);
    await deleteDoc(categoryDocRef);
  }
}
