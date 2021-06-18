import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction<object>("SET_USER");
export const removeUser = createAction("REMOVE_USER");

export default createReducer({id: ""},{
	[setUser.type]: (state, action) => action.payload,
	[removeUser.type]: (state, action) => {localStorage.removeItem("token")}
})