import { combineReducers } from "redux";

import {
	DATA_IS_LOADING,
	LOADING_ERROR,
	FETCH_DATA_SUCCESS,
	FETCH_DATA_BOOKMARK_SUCCESS,
	CLEAR_SEARCH_DATA,
	ADD_BOOKMARK,
	DELETE_BOOKMARK
} from "./actions";

const repoState = (state = [], action) => {
	switch (action.type) {
		case FETCH_DATA_SUCCESS:
			return action.payload;
		case CLEAR_SEARCH_DATA:
			return action.payload;
		default:
			return state;
	}
};
const bookmarkState = (state = [], action) => {
	switch (action.type) {
		case FETCH_DATA_BOOKMARK_SUCCESS:
			return action.payload;
		case ADD_BOOKMARK:
			const newState = [...state, action.payload];
			return newState;
		case DELETE_BOOKMARK:
			const index = state.findIndex(item => item.id === action.payload);
			const newStateDel = [...state];
			newStateDel.splice(index, 1);
			return newStateDel;
		default:
			return state;
	}
};

const loadingState = (state = false, action) => {
	switch (action.type) {
		case DATA_IS_LOADING:
			return action.payload;
		default:
			return state;
	}
};

const errorState = (state = false, action) => {
	switch (action.type) {
		case LOADING_ERROR:
			return action.payload;
		default:
			return state;
	}
};

// const reservationStateSingle = (state = {}, action) => {
// 	switch (action.type) {
// 		case DATA_FETCH_SUCCESS_SINGLE:
// 			return action.payload;
// 		default:
// 			return state;
// 	}
// };

// const availabilityState = (state = [], action) => {
// 	switch (action.type) {
// 		case AV_FETCH_SUCCESS:
// 			return action.payload;
// 		default:
// 			return state;
// 	}
// };

const reducer = combineReducers({
	repoState,
	bookmarkState,
	loadingState,
	errorState
	// availabilityState,
	// reservationStateSingle
});

export default reducer;
