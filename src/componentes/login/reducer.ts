import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction<object>("SET_USER");
export const removeUser = createAction("REMOVE_USER");
const INITIAL_STATE: any = null;
export default createReducer(INITIAL_STATE,{
	[setUser.type]: (state, action) => action.payload,
	[removeUser.type]: (state, action) => {localStorage.removeItem("token")}
})