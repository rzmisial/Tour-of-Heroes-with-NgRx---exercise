import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '../hero';
import { heroesGet, heroAdd, heroDelete } from '../hero.actions';
import { getHeroesSelector } from '../hero.reducer';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.styl']
})
export class HeroesComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  constructor(
    private store: Store<{ heroes: Hero[] }>
  ) {
    this.heroes$ = this.store.select(getHeroesSelector);    // <-- We used a new selector here
    // VERY USEFUL (memoisation)
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.store.dispatch(heroesGet());
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }
    const newHero = { name } as Hero;
    this.store.dispatch(heroAdd({newHero}));
  }

  delete(hero: Hero): void {
    this.store.dispatch(heroDelete({ toDeleteHero: hero }));
  }
}
