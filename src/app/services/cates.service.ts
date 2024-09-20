import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import {
  addDoc,
  collection,
  DocumentSnapshot,
  Firestore,
  getDocs,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { cateConverter } from './converter/cates-converter';

@Injectable({
  providedIn: 'root',
})
export class CatesServiceService {
  constructor(private firestore: Firestore) {}

  async list(): Promise<Category[]> {
    // const categoryCollection = collection(
    //   this.firestore,
    //   'categories'
    // ).withConverter(cateConverter);
    // const querySnapshot: QuerySnapshot<Category> = await getDocs(
    //   categoryCollection
    // );

    // return querySnapshot.docs.map((docSnap: DocumentSnapshot<Category>) =>
    //   docSnap.data()
    // );
    return []; // return empty array for now
  }
  
    // Get a single category (handle later)
  get(id: string): Category | undefined {
    return undefined; // You can implement this later
  }
  // Add a new category to Firestore
  async add(category: Category): Promise<void> {
    const categoryCollection = collection(this.firestore, 'categories').withConverter(cateConverter);
    await addDoc(categoryCollection, category);
    console.log("afteraddDoc- categoryCol",categoryCollection)
    console.log("afteraddDoc- category",category)
    console.log("afteraddDoc- this.firestore",this.firestore)
  }

  // Update a category (to be implemented later)
  update(category: Category): void {
    // Implement Firestore update logic
  }
   // Delete a category (to be implemented later)
   delete(id: string): void {
    // Implement Firestore delete logic
  }

}
