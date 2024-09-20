//to be deleted 
import {
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp,
  } from '@angular/fire/firestore';
  import { Category } from '../../../shared/model/category';
  import { TranslatedWord } from '../../../shared/model/translated-word';
  // import { Language } from '../../../shared/model/language';
  
  // adding new category to firestore  
  export const categoryConverter = {
    // toFirestore:(categoryToSave: Category) => {
      toFirestore:(categoryToSave: Category) => {
      const wordsArr = [];
     
      
      
  
      for (let i = 0; i < categoryToSave.words.length; ++i) {
        wordsArr.push({
          words:categoryToSave.words.map((word) =>({
            
            //2nd way suggested
            origin : word.origin,
            target : word.target,
            guess : word.guess,
            answer : word.answer,
            categoryId : word.categoryId
            
            
            //first way my thoughts
            // origin: categoryToSave.words[i].origin,
            // target: categoryToSave.words[i].target,
            // guess : categoryToSave.words[i].guess,
            // answer : categoryToSave.words[i].answer,
            // categoryId : categoryToSave.words[i].categoryId

          }))
          // TranslatedWord : categoryToSave.words[i],
          // words:categoryToSave.words[i].,
          // origin:categoryToSave.origin
          // target: categoryToSave.words[i].target
          // guess:categoryToSave.words[i].guess,
          // origin:categoryToSave.words[i].origin,
          
          
        })

      }
      
      return {
        name: categoryToSave.name,
        origin:JSON.stringify(categoryToSave.origin),
        target:JSON.stringify(categoryToSave.target),
        words:wordsArr,
        lastUpdateDate: Timestamp.fromDate(categoryToSave.lastUpdateDate),

      };
    },

    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ) => {
      const data = snapshot.data(options);
      const category = new Category(
        snapshot.id,
        data['name'],
        data['words'],
        data['lastUpdateDate'],
        
      );
  
      const words = data['words'];
      if (words) {
        for (let i = 0; i < words.length; ++i) {
          category.words.push(new TranslatedWord(words[i].origin, words[i].target))


        }
      }
     const lastUpdateDate = data['lastUpdateDate'].toDate()
     if(lastUpdateDate){
      category.lastUpdateDate = lastUpdateDate
     }
  
      return category;
    },
    
  };