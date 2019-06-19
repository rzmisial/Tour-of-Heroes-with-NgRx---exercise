import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { heroesGet, heroesSearchReset } from '../hero.actions';
import { getFirstFiveHeroesSelector } from '../hero.reducer';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.styl' ]
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(
    private store: Store<{heroes: Hero[]}>) {
      this.heroes$ = this.store.select(getFirstFiveHeroesSelector);
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(heroesSearchReset());
    this.store.dispatch(heroesGet());
  }
}
