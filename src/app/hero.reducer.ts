import { createReducer, on, State, Action, createFeatureSelector, createSelector } from '@ngrx/store';

import { Hero } from './hero';
import { heroesGetSuccess, heroAddSuccess, heroDeleteSuccess,
    heroUpdateSuccess, heroesSearchSuccess, heroesSearchReset } from './hero.actions';

export interface DataState {
    heroes: Hero[];
    fittingHeroes: Hero[];
}

// export const initialState: Hero[] = [];

export const initialState: DataState = {
    heroes: [],
    fittingHeroes: []
};

// The way the reducer is being created has changed.
// We use a reducer function now - read a bit more about it.
export const heroReducerCreator = createReducer(initialState,
    on( heroesGetSuccess, (state, action) => {
        return {...state, heroes: action.payload }; }),
    on( heroAddSuccess, (state, action) => {
        const newHeroes =  state.heroes.slice();
        newHeroes.push(action.newHero);
        return {...state, heroes:  newHeroes}; }),
    on( heroDeleteSuccess, (state, action) => {
        let newHeroes =  state.heroes.slice();
        newHeroes = newHeroes.filter(h => h.id !== action.toDeleteHeroId);
        return {...state, heroes:  newHeroes}; }),
    on( heroUpdateSuccess, (state, action) => {
        const newHeroes = state.heroes.slice();
        const heroIndex = newHeroes.findIndex(h => h.id === action.toUpdateHero.id);
        newHeroes[heroIndex] = action.toUpdateHero;
        return {... state, heroes: newHeroes }; }),
    on( heroesSearchSuccess, (state, action) => {
        return {...state, fittingHeroes: action.payload }; }),
    on( heroesSearchReset, (state, action) => {
        return {...state, fittingHeroes: [] }; })
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
export const getHeroesSelector = createSelector(
    heroState,
    (state) => state.heroes
);

export const getSearchedHeroesSelector = createSelector(
    heroState,
    (state) => state.fittingHeroes
);

// Btw. createSelector can also be used to create a selector based on several slices at the same time.
// READ MORE ABOUT SELECTORS!!!

export const getFirstFiveHeroesSelector = createSelector(
    heroState,
    (state) => state.heroes = state.heroes.slice(0, 4)
);

export const getHeroByIdSelector = createSelector(
    heroState,
    (state, props) => {
        return state.heroes.find(h => h.id === props.id); }
);
