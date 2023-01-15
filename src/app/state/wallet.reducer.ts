import { createReducer, on } from '@ngrx/store';
import { addWallet, reset } from './wallet.actions';

export const initialState = "";

export const walletReducer = createReducer(
  initialState,
  on(addWallet, (state) => state),
  on(reset, (state) => "")
);

