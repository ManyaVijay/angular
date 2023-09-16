import {User} from '../app/models/list';


export const LIST_RQU ="list request";
export const LIST_SUC ="list success";
export const LIST_FAI ="list failed"

export class UserListRequestAction {
    readonly type = LIST_RQU
}
export class UserListSuccessAction {
    readonly type = LIST_SUC

    constructor(public payload?: { data: User[] }){

    }
}
export class UserUpdateAction {
    readonly type = LIST_FAI
}