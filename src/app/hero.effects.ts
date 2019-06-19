import { Injectable } from '@angular/core';
import { Actions , Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, switchMap } from 'rxjs/operators';

import { HeroService } from './hero.service';
import { heroesGet, heroesGetSuccess, heroAdd, heroAddSuccess, heroDelete, heroDeleteSuccess,
    heroUpdate, heroUpdateSuccess, heroesSearch, heroesSearchSuccess} from './hero.actions';

@Injectable()
export class HeroEffects {

   getHeroes$ = createEffect(() => this.actions$.pipe(
        ofType(heroesGet),
        mergeMap(() => this.heroService.getHeroes()
            .pipe(
                map(heroes => (heroesGetSuccess({payload: heroes}))),
                catchError(() => EMPTY)
            ))
        )
    );

    addHero$ = createEffect(() => this.actions$.pipe(
        ofType(heroAdd),
        mergeMap(action => this.heroService.addHero(action.newHero)
            .pipe(
                map(hero => (heroAddSuccess({newHero: hero}))),
                catchError(() => EMPTY)
            ))
        )
    );

    deleteHero$ = createEffect(() => this.actions$.pipe(
        ofType(heroDelete),
        switchMap(action => {
            const heroId = action.toDeleteHero.id;
            return this.heroService.deleteHero(action.toDeleteHero)
            .pipe(
                map(hero => (heroDeleteSuccess({toDeleteHeroId: heroId}))),
                catchError(() => EMPTY)
            );
            })
        )
    );

    updateHero$ = createEffect(() => this.actions$.pipe(
        ofType(heroUpdate),
        mergeMap(action => this.heroService.updateHero(action.toUpdateHero)
            .pipe(
                map(() => (heroUpdateSuccess({toUpdateHero: action.toUpdateHero}))),
                catchError(() => EMPTY)
            ))
        )
    );

    searchHeroes$ = createEffect(() => this.actions$.pipe(
        ofType(heroesSearch),
        mergeMap((action) => this.heroService.searchHeroes(action.term)
            .pipe(
                map(heroes => (heroesSearchSuccess({payload: heroes}))),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private heroService: HeroService
    ) {}
}

