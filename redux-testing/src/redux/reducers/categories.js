import { unionBy } from 'lodash';
import {
	REQUEST_CATEGORIES,
	RECEIVE_CATEGORIES,
} from '../actions';


const initialCategoriesState = {
	fetching: false,
	all: [],
};

function categories(state = initialCategoriesState, action) {
	if (action && action.type) {
		switch(action.type) {
			case REQUEST_CATEGORIES:
				return {
					fetching: true,
				};

			case RECEIVE_CATEGORIES:
				let stateCategories = state.all ? state.all : [];

				return {
					fetching: false,
					all: unionBy(stateCategories, action.all, 'name')
				}
			default:
				return state;
		}
	} else {
		return state;
	}
}

export default categories;