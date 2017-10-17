import { unionBy } from 'lodash';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
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
				let statePosts = state.posts ? state.posts : [];

				return Object.assign({}, state, {
					fetching: false,
					posts: unionBy(statePosts, action.posts, 'id'),
				});
			default:
				return state;
		}
	} else {
		return state;
	}
}


export default posts;