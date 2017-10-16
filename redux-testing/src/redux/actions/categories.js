import fetch from 'isomorphic-fetch';
import {
	REQUEST_CATEGORIES,
	RECEIVE_CATEGORIES,

	fetchAuth,
} from './index';

export function requestCategories() {
	return {
		type: REQUEST_CATEGORIES
	}
}

export function receiveCategories(allCategories) {
	return {
		type: RECEIVE_CATEGORIES,
		all: allCategories,
	}
}

export function fetchCategories() {
	return (dispatch) => {
		dispatch(requestCategories());

		return fetch(`http://localhost:3001/categories`, fetchAuth)
			.then(
				res => res.json(),
				err => console.log(`An error has occured: ${err}`) // put error handling action here rather than console
			)
			.then(json => {
				dispatch(receiveCategories(json.categories));
			});
	}
}