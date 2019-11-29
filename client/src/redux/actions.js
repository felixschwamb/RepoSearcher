// action types
export const DATA_IS_LOADING = "DATA_IS_LOADING";
export const LOADING_ERROR = "LOADING_ERROR";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_BOOKMARK_SUCCESS = "FETCH_DATA_BOOKMARK_SUCCESS";
export const CLEAR_SEARCH_DATA = "CLEAR_SEARCH_DATA";
export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const DELETE_BOOKMARK = "DELETE_BOOKMARK";

export const fetchDataSuccess = data => ({
	type: FETCH_DATA_SUCCESS,
	payload: data
});

export const fetchDataBookmarkSuccess = data => ({
	type: FETCH_DATA_BOOKMARK_SUCCESS,
	payload: data
});

export const fetchData = (url, type) => {
	return async dispatch => {
		dispatch(dataIsLoading(true));
		dispatch(loadingErrorFunc(false));

		try {
			let response = await fetch(url);

			if (!response.ok) {
				throw Error(response.statusText);
			}

			try {
				let data = await response.json();
				if (type === "repo") {
					dispatch(fetchDataSuccess(data));
				} else {
					dispatch(fetchDataBookmarkSuccess(data));
				}

				dispatch(dataIsLoading(false));
			} catch (error) {
				dispatch(loadingErrorFunc(true));
			}
		} catch (error) {
			dispatch(dataIsLoading(false));
			dispatch(loadingErrorFunc(true));
		}
	};
};

export const clearSearch = () => {
	return {
		type: CLEAR_SEARCH_DATA,
		payload: []
	};
};

export const dataIsLoading = bool => {
	return {
		type: DATA_IS_LOADING,
		payload: bool
	};
};

export const loadingErrorFunc = bool => {
	return {
		type: LOADING_ERROR,
		payload: bool
	};
};

export const addBookmark = data => {
	return {
		type: ADD_BOOKMARK,
		payload: data
	};
};

export const postOne = (urlPost, data) => {
	return async dispatch => {
		// dispatch(dataIsLoading(true));

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		};

		try {
			let response = await fetch(urlPost, options);
			if (!response.ok) {
				throw Error(response.statusText);
			}

			dispatch(addBookmark(data));
			// dispatch(dataIsLoading(false));
		} catch (error) {
			console.log("error", error);

			// dispatch(loadingErrorFunc(true));
		}
	};
};

export const deleteBookmark = id => {
	return {
		type: DELETE_BOOKMARK,
		payload: id
	};
};

export const deleteOne = (urlDelete, id) => {
	return async dispatch => {
		// dispatch(dataIsLoading(true));

		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		};

		try {
			let response = await fetch(urlDelete, options);
			if (!response.ok) {
				throw Error(response.statusText);
			}

			dispatch(deleteBookmark(id));
			// dispatch(dataIsLoading(false));
		} catch (error) {
			console.log("error", error);

			// dispatch(loadingErrorFunc(true));
		}
	};
};
