import { createAction, props } from '@ngrx/store';

export const addWallet = createAction('[Component] Add', props<{wallet: string}>());
export const reset = createAction('[Component] Reset');
