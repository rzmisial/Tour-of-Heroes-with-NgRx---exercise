import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { getHeroByIdSelector} from '../hero.reducer';
import { heroesGet, heroUpdate } from '../hero.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.styl' ]
})
export class HeroDetailComponent implements OnInit {

  hero$: Observable<Hero>;

  // We'll need to use reactive forms here. Two-way data binding is not a good idea with NgRx.
  // Question: We have Observable from store. How do we turn it into hero?
  // Look here: https://medium.com/@amcdnl/reactive-angular-forms-with-ngrx-533a2f28c127
  // https://angular.io/guide/reactive-forms

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store: Store<{ heroes: Hero[] }>
  ) {
      const currentHeroId = +this.route.snapshot.paramMap.get('id');
      this.hero$ = this.store.select(getHeroByIdSelector, {id: currentHeroId});
    }


  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.store.dispatch(heroesGet());
  }

  onSave(heroToSave: Hero) {
    this.store.dispatch(heroUpdate({toUpdateHero: heroToSave}));
  }
}
