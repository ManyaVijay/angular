import {Action} from '../actions';
import { LIST_RQU, LIST_SUC } from "src/actions/list"
import { User } from "src/app/models/list"


export interface UserReducerState {
    loading: boolean,
    loaded: boolean,
    users: User[]
  }

const initialState: UserReducerState ={
    loading: false,
    loaded: false,
    users: []
}
export function UserReducer(state = initialState, action: Action): UserReducerState {
    switch(action.type){
        case LIST_RQU:{
            return {...state, loading: true}
        }
        case LIST_SUC:{
            const updatedList = state.users.concat(action.payload.data)
            return{...state, loading: false, loaded:true, users:updatedList}
        }
        default: {
            return state;
        }
    }
    

}




//Selector 

export const getLoading = (state:UserReducerState) => state.loading
export const getLoaded = (state:UserReducerState) => state.loaded
export const getList = (state:UserReducerState) => state.users