import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Hero } from '../hero';
import { getSearchedHeroesSelector, selectAllHeroes } from '../hero.reducer';
import { heroesSearch } from '../hero.actions';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.styl' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;  // changed to observable
  private searchTerms = new Subject<string>();
  private lastChecked = 0;    // the last time a term was successfully searched
  private lastSearchTry = 0;  // the last time any search try was attempted

  constructor(
    private store: Store<{heroes: Hero[]}>) {
      this.heroes$ = this.store.select(getSearchedHeroesSelector);
  }

  // Delay for the sarch method.
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Push a search term into the observable stream.
  // Wait at least 300 ms before dispatching the action again.
  async search(searchTerm: string) {
    const thisSearchTry = new Date().getTime();
    this.lastSearchTry = thisSearchTry;
    const timePassed = thisSearchTry - this.lastChecked;
    if (timePassed < 300) {
      await this.delay(300 - timePassed);
    }
    if (this.lastSearchTry === thisSearchTry || searchTerm.length === 0) {
      this.lastChecked = new Date().getTime();
      this.store.dispatch(heroesSearch({term: searchTerm}));
      console.log('SEARCHING  ' + searchTerm);
    }
  }

  ngOnInit(): void {}
}
