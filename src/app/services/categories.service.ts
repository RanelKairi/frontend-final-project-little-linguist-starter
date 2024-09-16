// import { categories } from './../../shared/data/categories';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
// import { TranslatedWord } from '../../shared/model/translated-word';
import { addDoc, collection, DocumentSnapshot, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(firestoreService : Firestore){

  }
 

    
  
list() : Category[]{
  return []
}  


  get(id : string) : Category | undefined {
    return undefined
  }

  delete(id : string) : void {
    
  }

  update(category : Category) : void {
    
  }

 add(category : Category) {
 
  }

  
}


// fetchCateDetails(selectedCateWords : TranslatedWord):void {} רעיון למימוש פונקציות נהסרוויס אולי בהמשך