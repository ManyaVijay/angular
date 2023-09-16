import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as fromUser from "./list-reducres";

export interface RootReducerState{
    users: fromUser.UserReducerState;
}


export const rootReducer: ActionReducerMap<RootReducerState> = {
    users: fromUser.UserReducer
  };



export const getListState = (state: RootReducerState) => state.users;
export const getListLoaded = createSelector(getListState, fromUser.getLoaded);
export const getListLoading = createSelector(getListState, fromUser.getLoading);
export const getList = createSelector(getListState, fromUser.getList);