import { unionBy } from 'lodash';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,

	CREATE_POST,
	POST_CREATED,
	POST_HAS_ERRORS,

	REQUEST_UPDATE_POST,
	RECEIVE_UPDATE_POST,
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

				return {
					...state,
					fetching: false,
					posts: unionBy(state.posts, action.posts, 'id'),
				};

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
			case REQUEST_UPDATE_POST:
				return Object.assign({}, state, {
					fetching: true,
				});
			case RECEIVE_UPDATE_POST:
				let allPosts = [];
				state.posts.forEach((post) => {
					if (post.id !== action.post.id) {
						allPosts.push(post);
					}
				});
				return {
					...state,
					posts: [...allPosts, action.post],
					fetching: false,
				};
			default:
				return state;
		}
	} else {
		return state;
	}
}


export default posts;