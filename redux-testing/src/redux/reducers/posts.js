import { unionBy } from 'lodash';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,

	CREATE_POST,
	POST_CREATED,
	POST_HAS_ERRORS,
} from '../actions';


export const initialPostState = {
	fetching: false,
	posts: [],
};
function posts(state = initialPostState, action) {
	if (action && action.type) {
		switch(action.type) {
			case REQUEST_POSTS:
				return Object.assign({}, state, {
					fetching: true,
				});
			case RECEIVE_POSTS:
				return Object.assign({}, state, {
					fetching: false,
					posts: unionBy(state.posts, action.posts, 'id'),
				});

			case CREATE_POST:
				return Object.assign({}, state, {
					fetching: true,
				});

			case POST_CREATED:
				return Object.assign({}, state, {
					fetching: false,
					posts: [...state.posts, action.post],
					postErrors: [],
				});
			case POST_HAS_ERRORS:
				return Object.assign({}, state, {
					fetching: false,
					postErrors: action.errors,
				});
			default:
				return state;
		}
	} else {
		return state;
	}
}


export default posts;