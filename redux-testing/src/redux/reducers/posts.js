import { unionBy } from 'lodash';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
} from '../actions';


export const initialPostState = {
	fetching: false,
	fetchingComments: false,
	currentPostComments: [],
	posts: [],
};
function posts(state = initialPostState, action) {
	if (action && action.type) {
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


export default posts;