import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', active: true },
      { id: 12, name: 'Narco', active: true },
      { id: 13, name: 'Bombasto', active: false },
      { id: 14, name: 'Celeritas', active: true },
      { id: 15, name: 'Magneta', active: true },
      { id: 16, name: 'RubberMan', active: true },
      { id: 17, name: 'Dynama', active: true },
      { id: 18, name: 'Dr IQ', active: true },
      { id: 19, name: 'Magma', active: false },
      { id: 20, name: 'Tornado', active: true }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
