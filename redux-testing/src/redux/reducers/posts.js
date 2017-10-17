import { unionBy } from 'lodash';
import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	GET_POST_COMMENTS,
	RECEIVE_POST_COMMENTS,
} from '../actions';


export const initialPostState = {
	fetching: false,
	fetchingComments: false,
	currentPostCommentsId: '',
	currentPostComments: [],
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
			case GET_POST_COMMENTS:
				return Object.assign({}, state, {
					fetchingComments: true,
					currentPostCommentsId: action.id,
					currentPostComments: [],
				});
			case RECEIVE_POST_COMMENTS:
				return Object.assign({}, state, {
					fetchingComments: false,
					currentPostComments: action.comments,
				});
			default:
				return state;
		}
	} else {
		return state;
	}
}


export default posts;