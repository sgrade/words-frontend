import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Word } from './word';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const words = [
      { id: 11, name: 'Cow', imageurl: 'cow.jpg' },
      { id: 12, name: 'Dog', imageurl: 'dog.jpg' },
      { id: 13, name: 'Mouse', imageurl: 'mouse.jpg' },
      { id: 14, name: 'Train', imageurl: 'train.jpeg' },
      { id: 15, name: 'Magneta', imageurl: 'mock-image.jpg' },
      { id: 16, name: 'RubberMan', imageurl: 'mock-image.jpg' },
      { id: 17, name: 'Dynama', imageurl: 'mock-image.jpg' },
      { id: 18, name: 'Dr IQ', imageurl: 'mock-image.jpg' },
      { id: 19, name: 'Magma', imageurl: 'mock-image.jpg' },
      { id: 20, name: 'Tornado', imageurl: 'mock-image.jpg' }
    ];
    return { words };
  }

  // Overrides the genId method to ensure that a word always has an id.
  // If the words array is empty,
  // the method below returns the initial number (11).
  // if the words array is not empty, the method below returns the highest
  // word id + 1.
  genId(words: Word[]): number {
    return words.length > 0 ? Math.max(...words.map(word => word.id)) + 1 : 11;
  }
}
