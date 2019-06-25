import { createReducer, on, State, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Hero } from './hero';
import { heroesGetSuccess, heroAddSuccess, heroDeleteSuccess,
    heroUpdateSuccess, heroesSearchSuccess, heroesSearchReset } from './hero.actions';

export interface DataState extends EntityState<Hero> {
    searchedHeroes: Hero[];
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export const initialState: DataState = adapter.getInitialState({
    searchedHeroes: []
});

// The way the reducer is being created has changed.
// We use a reducer function now - read a bit more about it.
export const heroReducerCreator = createReducer(initialState,
    on( heroesGetSuccess, (state, action) => {
        return adapter.addAll(action.payload, state)/*{...state, heroes: action.payload }*/; }),
    on( heroAddSuccess, (state, action) => {
        return adapter.addOne(action.newHero, state); }),
    on( heroDeleteSuccess, (state, action) => {
        return adapter.removeOne(action.toDeleteHeroId, state); }),
    on( heroUpdateSuccess, (state, action) => {
        return adapter.upsertOne(action.toUpdateHero, state); }),  // TODO: check UPDATE of type Update<Hero>
    on( heroesSearchSuccess, (state, action) => {
        return {...state, searchedHeroes: action.payload }; }),     // TODO: need to fix hero searching
    on( heroesSearchReset, (state, action) => {
        return {...state, searchedHeroes: [] }; })
);

export function heroReducer(state: DataState | undefined, action: Action) {
    return heroReducerCreator(state, action);
}

// The use of selectors below allows us to use memoization!

// We have a feature selector now. We use it to select just the heroes.
// We select the property 'heroes' here.
export const heroState = createFeatureSelector<DataState>('heroes');

// We create the selector. we use the createFeatureSelector on our type DataState
// and select just the "heroes" slice. Works because we have "heroes" defined as a slice od DataState.
export const {
    selectAll: selectAllHeroes,
    selectIds: selectAllHeroesIds
  } = adapter.getSelectors(heroState);

export const getSearchedHeroesSelector = createSelector(
    heroState,
    (state) =>  state.searchedHeroes
);

// Btw. createSelector can also be used to create a selector based on several slices at the same time.
// READ MORE ABOUT SELECTORS!!!

export const getFirstFiveHeroesSelector = createSelector(
    selectAllHeroes,
    (heroes) => heroes = heroes.slice(0, 5)
);

export const getHeroByIdSelector = createSelector(
    selectAllHeroes,
    selectAllHeroesIds,
    (heroEntities, heroIds, props) => {
        const pos = heroIds.indexOf(props.id);
        return heroEntities[pos];
    }
);
