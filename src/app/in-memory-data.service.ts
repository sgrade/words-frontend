import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Word } from './word';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const words = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
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
