import {
	GET_POST_COMMENTS,
	RECEIVE_POST_COMMENTS,
} from '../actions';

export const initialCommentsState = {
	fetchingComments: false,
	currentPostCommentsId: '',
	currentPostComments: [],
};

function comments(state = initialCommentsState, action) {
	if (action && action.type) {
		switch(action.type) {
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

export default comments;