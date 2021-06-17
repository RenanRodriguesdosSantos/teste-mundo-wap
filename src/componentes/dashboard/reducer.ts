import { createAction, createReducer } from "@reduxjs/toolkit";

export const set_widgets = createAction<any>('SET_WIDGETS');

export default createReducer([], {
    [set_widgets.type]: (state, action) => action.payload
});


