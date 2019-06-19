import { createAction, props } from '@ngrx/store';

import {Hero} from './hero';


export const heroesGet =
    createAction('[Hero Component] Get Heroes');

export const heroesGetSuccess =
    createAction('[Heroes API] Heroes Get Success', props< { payload: Hero[]; }>());

export const heroAdd =
    createAction('[Hero Component] Hero Add', props< { newHero: Hero; }>());

export const heroAddSuccess =
    createAction('[Hero API] Hero Add Success', props< { newHero: Hero; }>());

export const heroDelete =
    createAction('[Hero Component] Hero Delete', props< { toDeleteHero: Hero; }>());

export const heroDeleteSuccess =
    createAction('[Hero API] Hero Delete Success', props< { toDeleteHeroId: number; }>());

export const heroUpdate =
    createAction('[Hero Detail Component] Hero Update', props< { toUpdateHero: Hero; }>());

export const heroUpdateSuccess =
    createAction('[Hero Detail] Hero Update Success', props< { toUpdateHero: Hero; }>());

export const heroesSearch =
    createAction('[Hero Detail] Hero Search', props< { term: string; }>());

export const heroesSearchSuccess =
    createAction('[Hero API] Hero Search Success', props< { payload: Hero[]; }>());

export const heroesSearchReset =
    createAction('[Hero Detail] Hero Search Reset');
