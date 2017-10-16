import { combineReducers } from 'redux';
import { unionBy } from 'lodash';
import {
	REQUEST_CATEGORIES,
	RECEIVE_CATEGORIES,

	REQUEST_POSTS,
	RECEIVE_POSTS,
} from './actions';


const initialCategoriesState = {
	fetching: false,
	all: [],
};

function categories(state = initialCategoriesState, action) {
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
}

const intialPostState = {
	fetching: false,
	posts: [],
	currentPost: {},
};
function posts(state = intialPostState, action) {
	switch(action.type) {
		case REQUEST_POSTS:
			return {
				fetching: true,
			};
		case RECEIVE_POSTS:
			let statePosts = state.posts ? state.posts : [];

			return {
				fetching: false,
				posts: unionBy(statePosts, action.posts, 'id'),
			}
		default:
			return state;
	}
}


const rootReducer = combineReducers({
	categories,
	posts,
});

export default rootReducer;