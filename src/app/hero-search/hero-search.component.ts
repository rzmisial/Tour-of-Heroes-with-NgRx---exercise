import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Hero } from '../hero';
import { getSearchedHeroesSelector } from '../hero.reducer';
import { heroesSearch } from '../hero.actions';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.styl' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  private lastChecked = 0;

  constructor(
    private store: Store<{heroes: Hero[]}>) {
      this.heroes$ = this.store.select(getSearchedHeroesSelector);
  }

  // Push a search term into the observable stream.
  search(searchTerm: string): void {
    const now = new Date().getTime();
    if (now - this.lastChecked > 300) {
      this.lastChecked = new Date().getTime();
      this.store.dispatch(heroesSearch({term: searchTerm}));
    }
  }

  ngOnInit(): void {}
}
