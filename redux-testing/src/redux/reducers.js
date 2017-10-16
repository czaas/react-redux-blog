import { combineReducers } from 'redux';
import {
	REQUEST_CATEGORIES,
	RECEIVE_CATEGORIES,

	REQUEST_POSTS,
	REQUEST_POST_BY_ID,
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
			break;

		case RECEIVE_CATEGORIES:
			let stateCategories = state.all ? state.all : [];

			return {
				fetching: false,
				all: [stateCategories, ...action.all]
			}
			break;
		default:
			return state;
			break;
	}
}

const intialPostState = {
	fetching: false,
	posts: []
};
function posts(state = intialPostState, action) {
	switch(action.type) {
		case REQUEST_POSTS:
			return {
				fetching: true,
			};
			break;
		case RECEIVE_POSTS:
			let statePosts = state.posts ? state.posts : [];

			return {
				fetching: false,
				posts: [...statePosts, action.posts],
			}
			break;
		default:
			return state;
			break;
	}
}


const rootReducer = combineReducers({
	categories,
	posts,
});

export default rootReducer;