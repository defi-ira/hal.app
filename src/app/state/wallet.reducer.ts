import { createReducer, on } from '@ngrx/store';
import { Web3State } from '../models/Web3State';
import { addWallet, reset } from './wallet.actions';

export const initialState: Web3State = {
    wallet: ""
};

export const walletReducer = createReducer(
  initialState,
  on(addWallet, (state, { wallet }) => ({ ...state, wallet: wallet })),
  on(reset, (state) => ({ ...state, wallet: "" }))
);

